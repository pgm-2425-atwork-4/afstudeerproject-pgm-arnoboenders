import { Controller, Post, Body, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderData) {
    const newOrder = await this.ordersService.createOrder(orderData);
    return { success: true, order_data: newOrder };
  }

  @Patch()
  async updateOrder(@Body() orderData) {
    const updatedOrder = await this.ordersService.updateOrder(orderData);
    return { success: true, order_data: updatedOrder };
  }
}
