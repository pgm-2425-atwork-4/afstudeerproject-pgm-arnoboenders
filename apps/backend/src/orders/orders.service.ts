import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable()
export class OrdersService {
  async createOrder(orderData): Promise<any[]> {
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
