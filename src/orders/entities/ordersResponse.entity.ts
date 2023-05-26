import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from './order.entity';

@ObjectType()
export class OrdersResponse {

  @Field(() => [Order])
  data: Order[];

  @Field(() => Int)
  pages: number;

}