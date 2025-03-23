import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface CreateOrderInput {
  name: string;
  phone_number: string;
  take_away_time: string;
  order_data: any;
  price: number;
  paid: boolean;
}

@Injectable()
export class OrdersService {
  async createOrder(orderData: CreateOrderInput): Promise<any[]> {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select();
    if (error) throw error;
    return data || [];
  }

  async getOrderById(orderId: string): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    if (error) {
      console.error('❌ Error fetching order:', error);
      return null;
    }
    return data;
  }

  async findOrder(phoneNumber: string, takeAwayTime: string): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('phone_number', phoneNumber)
      .eq('take_away_time', takeAwayTime)
      .order('id', { ascending: false }) // Get the most recent order
      .limit(1)
      .single();

    if (error) {
      console.error('❌ Error finding order:', error);
      return null;
    }

    return data;
  }
}
