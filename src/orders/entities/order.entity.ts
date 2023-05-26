import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Address } from 'src/addresses/entities/address.entity';
import { orderStatus, orderTypes, paymentMethodsType, promoCodeTypes } from 'src/constants/types.type';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@ObjectType()
export class Order {
  
  @Field(() => ID)
  _id: string;

  @Field(()=> User)
  user: string | User;

  @Field(()=> Restaurant)
  restaurant: string | Restaurant;

  @Field(()=> Address)
  address: string | Address;

  @Field(()=> [OrderItem])
  meals: OrderItem[];

  @Field(()=> Driver, {nullable: true})
  driver?: string | Driver;

  @Field(()=> Float)
  totalPrice: number;

  @Field(()=> Int, {nullable: true})
  totalPoints?: number;

  @Field(()=> Int, {nullable: true})
  price?: number;

  @Field(()=> Int, {nullable: true})
  recievedPrice?: number;

  @Field()
  type: orderTypes;

  @Field(()=> Int)
  deliveryPrice: number;

  @Field(()=> Boolean)
  tableware: boolean;

  @Field(()=> Boolean)
  hasRating: boolean;

  @Field()
  details: string;

  @Field()
  paymentMethod: paymentMethodsType;

  @Field()
  state: orderStatus;

  @Field({nullable: true})
  promoCode?: string;

  @Field(()=> Int, {nullable: true})
  discount?: number;

  @Field({nullable: true})
  discountType?: promoCodeTypes;

  @Field(()=> Int, {nullable: true})
  walletAmount?: number;

  @Field(()=> Int, {nullable: true})
  walletPoints?: number;

  @Field(()=> Int, {nullable: true})
  pointsBack?: number;

  @Field(()=> Date, {nullable: true})
  createdAt?: Date

  @Field(()=> Date, {nullable: true})
  updatedAt?: Date

}
