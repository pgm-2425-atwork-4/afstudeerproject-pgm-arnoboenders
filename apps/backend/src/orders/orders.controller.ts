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
  price?: number;
  paid?: boolean;
}

interface OrderItem {
  name: string;
  price: number;
  amount: number;
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
      event = stripe.webhooks.constructEvent(
        request.body, // Use rawBody from body-parser config
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      try {
        const metadata = event.data.object.metadata;

        if (!metadata) {
          console.error('❌ No metadata');
          return response
            .status(400)
            .send({ success: false, message: 'No metadata' });
        }

        const takeawayTimeId = parseInt(metadata.take_away_time, 10);

        const takeawaySlot =
          await this.takeawayService.getTimeSlotById(takeawayTimeId);
        if (!takeawaySlot) {
          console.error('❌ Invalid takeaway time ID');
          return response
            .status(400)
            .send({ success: false, message: 'Invalid takeaway time ID' });
        }

        const parsedOrderData = JSON.parse(metadata.order_data);

        const orderData = {
          name: metadata.name,
          phone_number: metadata.phone_number,
          take_away_time: takeawaySlot.id,
          order_data: JSON.parse(metadata.order_data) as OrderItem[],
          price: event.data.object.amount_total! / 100,
          paid: metadata.paid === 'true',
        };

        const createdOrder = await this.ordersService.createOrder(orderData);

        if (!createdOrder || createdOrder.length === 0) {
          console.error('❌ Order creation failed.');
          return { success: false, message: 'Failed to create order' };
        }

        const orderId: string = createdOrder[0].id;

        await this.takeawayService.assignOrderToTimeSlot(takeawaySlot, orderId);
        return response.status(200).send({ success: true });
      } catch (error) {
        console.error('❌ Error processing order:', error);
        return { success: false, message: 'Error processing order' };
      }
    }

    console.log(`⚠️ Unhandled event type: ${event.type}`);
    return { success: false, message: 'Unhandled event type' };
  }

  @Post('save-unpaid-order')
  async saveUnpaidOrder(@Body() orderData: OrderData & { paid?: boolean }) {
    const {
      order_data,
      take_away_time,
      name,
      phone_number,
      paid = false,
    } = orderData;

    const takeawaySlot =
      await this.takeawayService.getTimeSlotById(take_away_time);
    if (!takeawaySlot) {
      return { success: false, message: 'Ongeldige afhaaltijd' };
    }

    const totalPrice = order_data.reduce((sum, item) => sum + item.price, 0);

    const createdOrder = await this.ordersService.createOrder({
      name,
      phone_number,
      take_away_time: take_away_time.toString(),
      order_data,
      price: totalPrice,
      paid,
    });

    if (!createdOrder || createdOrder.length === 0) {
      return {
        success: false,
        message: 'Bestelling kon niet worden aangemaakt',
      };
    }

    const orderId: string = createdOrder[0].id;

    await this.takeawayService.assignOrderToTimeSlot(takeawaySlot, orderId);

    return { success: true, orderId };
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
