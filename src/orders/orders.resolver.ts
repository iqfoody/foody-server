import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { LimitEntity } from 'src/constants/limitEntity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { OrdersResponse } from './entities/ordersResponse.entity';
import { HomeResponse } from 'src/constants/homeResponse.entity';
import { Months } from 'src/constants/reportsResults.entity';

@UseGuards(AccessAuthGuard)
@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService,) {}

  @Mutation(() => Order)
  @CheckAbilities({actions: Actions.Create, subject: Order})
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  //TODO: -> orders response...
  @Query(() => OrdersResponse, { name: 'orders' })
  @CheckAbilities({actions: Actions.Read, subject: Order})
  findAll(@Args('limitEntity', { type: () => LimitEntity }) limitEntity: LimitEntity) {
    return this.ordersService.findAll(limitEntity);
  }

  @Query(() => HomeResponse)
  @CheckAbilities({actions: Actions.Read, subject: Order})
  homeValues() {
    return this.ordersService.home();
  }

  @Query(() => OrdersResponse, { name: 'ordersUser' })
  @CheckAbilities({actions: Actions.Read, subject: Order})
  findAllUserOrders(@Args('limitEntity', { type: () => LimitEntity }) limitEntity: LimitEntity) {
    return this.ordersService.findUserOrders(limitEntity);
  }

  @Query(() => Order, { name: 'order' })
  @CheckAbilities({actions: Actions.Read, subject: Order})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Order})
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: Order})
  removeOrder(@Args('id', { type: () => ID }) id: string) {
    return this.ordersService.remove(id);
  }

  @Query(() => Months, { name: 'profitsReport' })
  @CheckAbilities({actions: Actions.Read, subject: Order})
  profitsReports(@Args('date', {type: ()=> String}) date: string) {
    return this.ordersService.profitsReport(date);
  }

  @Query(() => Months, { name: 'ordersReport' })
  @CheckAbilities({actions: Actions.Read, subject: Order})
  ordersReports(@Args('date', {type: ()=> String}) date: string) {
    return this.ordersService.ordersReport(date);
  }
}
