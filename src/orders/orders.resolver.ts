import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { LimitEntity } from 'src/constants/limitEntity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { OrdersResponse } from './entities/ordersResponse.entity';
import { HomeResponse } from 'src/constants/homeResponse.entity';
import { Months } from 'src/constants/reportsResults.entity';
import { StateInput } from 'src/constants/state.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService,) {}

  @Mutation(() => Order)
  @CheckAbilities({actions: Actions.Create, subject: "Order"})
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  //TODO: -> orders response...
  @Query(() => OrdersResponse, { name: 'orders' })
  @CheckAbilities({actions: Actions.Read, subject: "Order"})
  findAll(@Args('limitEntity', { type: () => LimitEntity }) limitEntity: LimitEntity) {
    return this.ordersService.findAll(limitEntity);
  }

  @Query(() => HomeResponse)
  @CheckAbilities({actions: Actions.Read, subject: "Home"})
  homeValues() {
    return this.ordersService.home();
  }

  @Query(() => OrdersResponse, { name: 'ordersUser' })
  @CheckAbilities({actions: Actions.Read, subject: "Order"})
  findAllUserOrders(@Args('limitEntity', { type: () => LimitEntity }) limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't order with this id");
    return this.ordersService.findUserOrders(limitEntity);
  }

  @Query(() => OrdersResponse, { name: 'ordersDriver' })
  @CheckAbilities({actions: Actions.Read, subject: "Order"})
  findAllDriverOrders(@Args('limitEntity', { type: () => LimitEntity }) limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't order with this id");
    return this.ordersService.findDriverOrders(limitEntity);
  }

  @Query(() => Order, { name: 'order' })
  @CheckAbilities({actions: Actions.Read, subject: "Order"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  @CheckAbilities({actions: Actions.Update, subject: "Order"})
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    if(!isValidObjectId(updateOrderInput?.id)) throw new BadRequestException("There isn't order with this id");
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Order"})
  stateOrder(@Args('stateInput') stateInput: StateInput) {
    if(!isValidObjectId(stateInput?.id)) throw new BadRequestException("There isn't order with this id");
    return this.ordersService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Order"})
  removeOrder(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    return this.ordersService.remove(id);
  }

  @Query(() => Months, { name: 'profitsReport' })
  @CheckAbilities({actions: Actions.Read, subject: "Order"})
  profitsReports(@Args('date', {type: ()=> String}) date: string) {
    return this.ordersService.profitsReport(date);
  }

  @Query(() => Months, { name: 'ordersReport' })
  @CheckAbilities({actions: Actions.Read, subject: "Order"})
  ordersReports(@Args('date', {type: ()=> String}) date: string) {
    return this.ordersService.ordersReport(date);
  }
}
