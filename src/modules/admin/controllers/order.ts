import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';
import { ListOrder } from '../validators/order/list';
import { SaveOrder } from '../validators/order/save';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired([enRoles.admin])
export class OrderController {
  constructor(private orderRepository: OrderRepository) {}

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: SaveOrder, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderRepository.save(model, currentUser);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListOrder) {
    return this.orderRepository.list(model);
  }
}
