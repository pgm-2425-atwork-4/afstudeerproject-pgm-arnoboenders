import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import { OrdersService } from '../orders.service';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

interface OrderData {
  orderId: string;
  name: string;
  phone_number: string;
  take_away_time: string;
  order_data: OrderItem[];
}

interface OrderItem {
  name: string;
  price: number;
  amount: number;
}

@Injectable()
export class StripeService {
  constructor(private ordersService: OrdersService) {}
  async createCheckoutSession(orderData: OrderData) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orderData.order_data.map((item: OrderItem) => ({
          price_data: {
            currency: 'eur',
            product_data: { name: item.name },
            unit_amount: Math.round((item.price / item.amount) * 100),
          },
          quantity: item.amount,
        })),
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/order/error`,
        metadata: {
          name: orderData.name,
          phone_number: orderData.phone_number,
          take_away_time: orderData.take_away_time,
          order_data: JSON.stringify(orderData.order_data), // Store order data as a string
        },
      });

      return { sessionId: session.id };
    } catch (error) {
      console.error('❌ Stripe Checkout Error:', error);
      return { error: 'Failed to create checkout session.' };
    }
  }

  /**
   * Verify if a payment was successful
   */
  async verifyPayment(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        if (session.metadata) {
          const { phone_number, take_away_time } = session.metadata;

          if (!phone_number || !take_away_time) {
            console.error(
              '❌ Metadata is missing phone_number or take_away_time.',
            );
            return {
              success: false,
              message: 'Missing metadata for order lookup',
            };
          }

          // Find the order in Supabase using phone_number and take_away_time
          const order = await this.ordersService.findOrder(
            phone_number,
            take_away_time,
          );

          if (!order) {
            console.error('❌ Order not found in database.');
            return { success: false, message: 'Order not found' };
          }

          return { success: true, orderId: order.id }; // Return orderId from Supabase
        } else {
          console.error('❌ Metadata is missing for session:', sessionId);
          return { success: false, message: 'Metadata is missing' };
        }
      } else {
        console.error('❌ Payment not completed for session:', sessionId);
        return { success: false, message: 'Payment not completed' };
      }
    } catch (error) {
      console.error('❌ Error verifying payment:', error);
      return { success: false, message: 'Error verifying payment' };
    }
  }
}
