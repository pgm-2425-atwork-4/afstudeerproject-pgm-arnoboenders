import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import {
  addMinutes,
  format,
  isAfter,
  differenceInMinutes,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable()
export class TakeawayService {
  async getNextAvailableTimes(orderSize: number): Promise<string[]> {
    const now = new Date();
    now.setHours(now.getHours()); // Adjust for time difference if needed

    const today = format(now, 'EEEE'); // Get current day (e.g., "Wednesday")

    // Fetch today's available takeaway slots
    const { data: slots, error } = await supabase
      .from('takeaway_time_slots')
      .select('time_slot, current_orders, max_orders')
      .eq('day_of_week', today)
      .eq('is_takeaway_available', true)
      .order('time_slot', { ascending: true });

    if (error) throw new BadRequestException(error.message);
    if (!slots || slots.length === 0) {
      throw new BadRequestException('No available takeaway slots for today');
    }

    const availableSlots: string[] = [];

    for (const slot of slots) {
      // Convert `HH:mm` string from DB to a Date object
      const [hours, minutes] = slot.time_slot.split(':').map(Number);
      const slotTime = setSeconds(
        setMinutes(setHours(new Date(), hours), minutes),
        0,
      );

      if (isAfter(slotTime, now) && slot.current_orders < slot.max_orders) {
        const minutesUntilSlot = differenceInMinutes(slotTime, now);

        if (minutesUntilSlot < 30) {
          // If it's less than 30 minutes from now, skip this slot
          continue;
        }

        let formattedTime = format(slotTime, 'HH:mm');

        // If order size > 8, shift time by 30 minutes
        if (orderSize > 8) {
          const adjustedTime = addMinutes(slotTime, 30);
          formattedTime = format(adjustedTime, 'HH:mm');
        }

        availableSlots.push(formattedTime);
      }
    }

    if (availableSlots.length === 0) {
      throw new BadRequestException('No valid takeaway slots available today');
    }

    return availableSlots;
  }

  // Assign an order to a takeaway time slot
  async assignOrderToTimeSlot(timeSlot: string) {
    const today = format(new Date(), 'EEEE');
    console.log('Today:', today);
    // Reformat timeSlot to '00:00:00'
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const formattedTimeSlot = format(
      setSeconds(setMinutes(setHours(new Date(), hours), minutes), 0),
      'HH:mm:ss',
    );
    console.log('Formatted time slot:', formattedTimeSlot);
    const { data: slot, error } = await supabase
      .from('takeaway_time_slots')
      .select('current_orders, max_orders')
      .eq('day_of_week', today)
      .eq('is_takeaway_available', true)
      .eq('time_slot', formattedTimeSlot)
      .single();
    console.log('Slot:', slot);

    if (error || !slot) {
      throw new BadRequestException('Time slot not found');
    }

    if (slot.current_orders >= slot.max_orders) {
      throw new BadRequestException('Time slot is full');
    }

    const { error: updateError } = await supabase
      .from('takeaway_time_slots')
      .update({ current_orders: slot.current_orders + 1 })
      .eq('day_of_week', today)
      .eq('time_slot', timeSlot);

    if (updateError) throw new BadRequestException(updateError.message);
  }
}
