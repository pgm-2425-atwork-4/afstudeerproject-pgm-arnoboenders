import { Module } from '@nestjs/common';
import { TakeawayController } from './takeaway.controller';
import { TakeawayService } from './takeaway.service';

@Module({
  controllers: [TakeawayController],
  providers: [TakeawayService],
})
export class TakeawayModule {}
