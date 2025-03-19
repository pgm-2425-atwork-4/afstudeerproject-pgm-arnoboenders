import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';
import { OrdersService } from './orders.service';
import { TakeawayService } from 'src/takeaway/takeaway.service';
import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

interface OrderData {
  orderId: string; // Changed from number to string
  name: string;
  phone_number: string;
  take_away_time: number; // Changed from string to number
  order_data: OrderItem[];
}

interface OrderItem {
  name: string;
  price: number;
  amount: number;
}

interface StripeMetadata {
  name: string;
  phone_number: string;
  take_away_time: string;
  order_data: string;
}

/**
 * Stripe Webhook Event Type
 */
interface StripeEvent {
  type: string;
  data: {
    object: {
      metadata?: StripeMetadata;
      amount_total: number;
    };
  };
}

@Controller('orders')
export class OrdersController {
  constructor(
    private stripeService: StripeService,
    private ordersService: OrdersService,
    private takeawayService: TakeawayService,
  ) {}

  /**
   * Creates a Stripe Checkout session
   */
  @Post('create-checkout-session')
  async createCheckoutSession(@Body() orderData: OrderData) {
    return this.stripeService.createCheckoutSession({
      ...orderData,
      take_away_time: orderData.take_away_time.toString(),
    });
  }

  /**
   * Webhook to listen for Stripe payment success events
   */
  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    let event: Stripe.Event;
    try {
      // Verify the Stripe event using the webhook secret
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || '',
      );
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      try {
        // Ensure metadata exists before accessing it
        const metadata = event.data.object.metadata;
        if (!metadata) {
          console.error('❌ Missing metadata in Stripe session.');
          return { success: false, message: 'Missing order metadata' };
        }

        if (!metadata.take_away_time) {
          console.error('❌ Missing takeaway time in metadata.');
          return { success: false, message: 'Missing takeaway time' };
        }

        // Convert `take_away_time` to a number
        const takeawayTimeId = parseInt(metadata.take_away_time, 10);
        if (isNaN(takeawayTimeId)) {
          console.error(
            '❌ Invalid takeaway time format:',
            metadata.take_away_time,
          );
          return { success: false, message: 'Invalid takeaway time format' };
        }

        // Fetch the full TakeawaySlot object
        const takeawaySlot =
          await this.takeawayService.getTimeSlotById(takeawayTimeId);
        if (!takeawaySlot) {
          console.error('❌ Takeaway slot not found:', takeawayTimeId);
          return { success: false, message: 'Invalid takeaway time slot' };
        }

        // Create order in database (auto-generates `orderId`)
        const orderData = {
          name: metadata.name,
          phone_number: metadata.phone_number,
          take_away_time: takeawaySlot.id, // Use correct takeaway slot ID
          order_data: JSON.parse(metadata.order_data) as OrderItem[],
          price: event.data.object.amount_total! / 100, // Convert from cents
        };

        const createdOrder = await this.ordersService.createOrder(orderData);

        if (!createdOrder || createdOrder.length === 0) {
          console.error('❌ Order creation failed.');
          return { success: false, message: 'Failed to create order' };
        }

        // Retrieve the generated orderId (auto-incremented)
        const orderId: string = createdOrder[0].id;

        // Assign order to the takeaway slot
        await this.takeawayService.assignOrderToTimeSlot(takeawaySlot, orderId);

        return {
          success: true,
          message: 'Order created successfully after payment',
        };
      } catch (error) {
        console.error('❌ Error processing order:', error);
        return { success: false, message: 'Error processing order' };
      }
    }

    console.log(`⚠️ Unhandled event type: ${event.type}`);
    return { success: false, message: 'Unhandled event type' };
  }

  /**
   * Check if a payment was successful
   */
  @Get('check-payment')
  async checkPayment(@Query('sessionId') sessionId: string) {
    if (!sessionId) {
      console.error('❌ No sessionId provided');
      return { success: false, message: 'No sessionId provided' };
    }

    const paymentStatus = await this.stripeService.verifyPayment(sessionId);

    if (paymentStatus.success && paymentStatus.orderId) {
      return { success: true, orderId: paymentStatus.orderId };
    } else {
      console.error('❌ Payment failed:', paymentStatus.message);
      return { success: false, message: 'Payment not completed' };
    }
  }
  @Get('get-order')
  async getOrder(@Query('orderId') orderId: string) {
    const orderNumber = orderId;
    if (orderNumber === '' || !orderNumber) {
      return { success: false, message: 'Invalid order ID' };
    }

    const order = (await this.ordersService.getOrderById(
      orderNumber,
    )) as OrderData | null;
    if (!order) {
      return { success: false, message: 'Order not found' };
    }

    return { success: true, order };
  }
}
