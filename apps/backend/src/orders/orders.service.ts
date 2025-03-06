import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'http://localhost:8000',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzQwNjk3MjAwLAogICJleHAiOiAxODk4NDYzNjAwCn0.RpkiVthIJn__oXVWlRTZaNfQm6hkTeTdzSDZWBdwndo',
);

@Injectable()
export class OrdersService {
  async createOrder(orderData) {
    const { data, error } = await supabase.from('orders').insert(orderData);
    if (error) throw error;
    return data;
  }
}
