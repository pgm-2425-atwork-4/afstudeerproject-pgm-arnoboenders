import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TakeawayService } from './takeaway/takeaway.service';
import { TakeawayModule } from './takeaway/takeaway.module';

@Module({
  imports: [OrdersModule, TakeawayModule],
  controllers: [AppController],
  providers: [AppService, TakeawayService],
})
export class AppModule {}
