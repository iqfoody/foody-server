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

@UseGuards(AccessAuthGuard)
@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @CheckAbilities({actions: Actions.Create, subject: Order})
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  //TODO: -> orders response...
  @Query(() => [Order], { name: 'orders' })
  @CheckAbilities({actions: Actions.Read, subject: Order})
  findAll(@Args('limitEntity', { type: () => LimitEntity }) limitEntity: LimitEntity) {
    return this.ordersService.findAll(limitEntity);
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
}
