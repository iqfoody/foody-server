import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Address } from 'src/addresses/entities/address.entity';
import { orderStatus, orderTypes, paymentMethodsType } from 'src/constants/types.type';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@ObjectType()
export class Order {
  
  @Field(() => ID)
  _id: string;

  @Field(()=> String || User)
  user: string | User;

  @Field(()=> String || Restaurant)
  restaurant: string | Restaurant;

  @Field(()=> String || Address)
  address: string | Address;

  @Field(()=> [OrderItem])
  meals: OrderItem[];

  @Field(()=> String || Driver, {nullable: true})
  driver?: string | Driver;

  @Field(()=> Int)
  totalPrice: number;

  @Field()
  type: orderTypes;

  @Field(()=> Int)
  deliveryPrice: number;

  @Field(()=> Boolean)
  tableware: boolean;

  @Field()
  details: string;

  @Field()
  paymentMethod: paymentMethodsType;

  @Field()
  state: orderStatus;

  @Field(()=> Int, {nullable: true})
  promoCode?: number;

  @Field(()=> Int, {nullable: true})
  discount?: number;

  @Field(()=> Int, {nullable: true})
  percent?: number;

  @Field(()=> Int, {nullable: true})
  walletAmount?: number;

  @Field(()=> Int, {nullable: true})
  walletPoint?: number;

}
