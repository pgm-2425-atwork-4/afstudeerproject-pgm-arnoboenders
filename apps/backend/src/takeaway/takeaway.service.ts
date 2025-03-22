import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import {
  format,
  isAfter,
  differenceInMinutes,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  tls: {}, // Required for Supabase Redis
});

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define a TypeScript interface for slots
interface TakeawaySlot {
  id: string;
  time_slot: string;
  current_orders: number;
  max_orders: number;
}

interface OrderItem {
  amount: number;
}

interface Order {
  order_data: OrderItem[];
}

@Injectable()
export class TakeawayService {
  async getTimeSlotById(slotId: number): Promise<TakeawaySlot | null> {
    const { data, error } = await supabase
      .from('takeaway_time_slots')
      .select('*')
      .eq('id', slotId)
      .single();

    if (error) {
      console.error('❌ Error fetching takeaway slot:', error);
      return null;
    }
    console.log(data);
    return data;
  }

  async getNextAvailableTimes(): Promise<TakeawaySlot[]> {
    const now = new Date();
    const today = format(now, 'EEEE');
    const cacheKey = `timeslots:${today}`;

    // Check Redis cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached) as TakeawaySlot[];
    }

    // Your existing logic to fetch from Supabase...
    const { data: slots, error } = await supabase
      .from('takeaway_time_slots')
      .select('id, time_slot, current_orders, max_orders')
      .eq('day_of_week', today)
      .eq('is_takeaway_available', true)
      .order('time_slot', { ascending: true });

    if (error) throw new BadRequestException(error.message);
    if (!slots || slots.length === 0) {
      throw new BadRequestException('No available takeaway slots for today');
    }

    const availableSlots: TakeawaySlot[] = [];

    for (const slot of slots as TakeawaySlot[]) {
      const [hours, minutes] = slot.time_slot.split(':').map(Number);
      const slotTime = setSeconds(
        setMinutes(setHours(new Date(), hours), minutes),
        0,
      );

      if (isAfter(slotTime, now) && slot.current_orders < slot.max_orders) {
        const minutesUntilSlot = differenceInMinutes(slotTime, now);
        if (minutesUntilSlot >= 30) {
          availableSlots.push(slot);
        }
      }
    }

    if (availableSlots.length === 0) {
      throw new BadRequestException('No valid takeaway slots available today');
    }

    // Save to Redis for 5 minutes
    await redis.set(cacheKey, JSON.stringify(availableSlots), 'EX', 300);

    return availableSlots;
  }

  // Assign an order to a takeaway time slot
  async assignOrderToTimeSlot(timeSlot: TakeawaySlot, orderId: string) {
    const today = format(new Date(), 'EEEE');

    // Fetch the time slot
    const { data: slot, error } = await supabase
      .from('takeaway_time_slots')
      .select('id, time_slot, current_orders, max_orders')
      .eq('day_of_week', today)
      .eq('is_takeaway_available', true)
      .eq('time_slot', timeSlot.time_slot)
      .single<TakeawaySlot>();

    if (error || !slot) {
      throw new BadRequestException('Time slot not found');
    }

    // Fetch the order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('order_data')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new BadRequestException('Order not found');
    }

    // Calculate total items in the order
    const totalItems: number = (order as Order).order_data.reduce(
      (sum: number, item: OrderItem) => sum + item.amount,
      0,
    );

    // Determine how many slots to count (1 for small orders, 2 for large)
    const orderIncrement = totalItems > 8 ? 2 : 1;

    // Check if updating would exceed the max orders allowed
    if (slot.current_orders + orderIncrement > slot.max_orders) {
      throw new BadRequestException('Time slot is full');
    }

    // Ensure TypeScript correctly infers `current_orders` as a number
    const newOrdersCount: number = slot.current_orders + orderIncrement;

    const { error: updateError } = await supabase
      .from('takeaway_time_slots')
      .update({ current_orders: newOrdersCount })
      .eq('day_of_week', today)
      .eq('time_slot', timeSlot.time_slot);

    await redis.del(`timeslots:${format(new Date(), 'EEEE')}`);

    if (updateError) throw new BadRequestException(updateError.message);
  }
}
