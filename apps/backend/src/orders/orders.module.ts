import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { StripeService } from './stripe/stripe.service';
import { TakeawayService } from 'src/takeaway/takeaway.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, StripeService, TakeawayService],
})
export class OrdersModule {}
