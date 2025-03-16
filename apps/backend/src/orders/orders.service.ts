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
    console.log(data);
    if (error) throw error;
    return data || [];
  }
  async updateOrder(orderData): Promise<any[]> {
    const { data, error } = await supabase.from('orders').update(orderData);
    if (error) throw error;
    return data || [];
  }
}
