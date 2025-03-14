import { Controller, Get, Post, Body } from '@nestjs/common';
import { TakeawayService } from './takeaway.service';

@Controller('takeaway-times')
export class TakeawayController {
  constructor(private readonly takeawayService: TakeawayService) {}

  @Get()
  async getAvailableSlots(): Promise<string[]> {
    return this.takeawayService.getNextAvailableTimes(0);
  }

  @Post('assign')
  async assignOrder(@Body() body: { timeSlot: string }) {
    await this.takeawayService.assignOrderToTimeSlot(body.timeSlot);
    return { message: 'Time slot assigned successfully' };
  }
}
