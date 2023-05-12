import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateOrderItemInput } from './create-order-item.entity';
import { orderTypes, paymentMethodsType } from 'src/constants/types.type';

@InputType()
export class CreateOrderInput {
  
  @Field(() => ID, {nullable: true})
  user?: string;

  @Field(() => ID)
  restaurant: string;

  @Field(() => ID)
  address: string;

  @Field(()=> [CreateOrderItemInput])
  meals: CreateOrderItemInput[];

  @Field(() => ID)
  driver?: string;

  @Field(()=> Boolean, {nullable: true})
  tableware?: boolean;

  @Field({nullable: true})
  details?: string;

  @Field({nullable: true})
  paymentMethod?: paymentMethodsType;

  @Field({nullable: true})
  promoCode?: string;

}
