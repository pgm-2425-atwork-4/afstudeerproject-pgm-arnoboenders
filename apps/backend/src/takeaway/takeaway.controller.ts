import { Controller, Get, Post, Body } from '@nestjs/common';
import { TakeawayService } from './takeaway.service';

interface TakeawaySlot {
  id: string;
  time_slot: string;
  current_orders: number;
  max_orders: number;
}

@Controller('takeaway-times')
export class TakeawayController {
  constructor(private readonly takeawayService: TakeawayService) {}

  @Get()
  async getAvailableSlots(): Promise<TakeawaySlot[]> {
    return this.takeawayService.getNextAvailableTimes();
  }

  @Post('assign')
  async assignOrder(@Body() body: { timeSlot: TakeawaySlot; orderId: string }) {
    await this.takeawayService.assignOrderToTimeSlot(
      body.timeSlot,
      body.orderId,
    );
    return { message: 'Time slot assigned successfully' };
  }
}
