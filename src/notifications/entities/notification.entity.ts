import { ObjectType, Field, ID } from '@nestjs/graphql';
import { notificationsStatus, notificationsTypes } from 'src/constants/types.type';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Meal } from 'src/meals/entities/meal.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Notification {
  @Field(() => ID)
  _id: string;

  @Field(()=> User, {nullable: true})
  user?: string | User;

  @Field(()=> Driver, {nullable: true})
  driver?: string | Driver;

  @Field(()=> Order, {nullable: true})
  order?: string | Order;

  @Field(()=> Restaurant, {nullable: true})
  restaurant?: string | Restaurant;

  @Field(()=> Meal, {nullable: true})
  meal?: string | Meal;

  @Field()
  type: notificationsTypes;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field()
  body: string;

  @Field()
  bodyEN: string;

  @Field({nullable: true})
  bodyKR?: string;

  @Field({nullable: true})
  image?: string;

  @Field()
  state: notificationsStatus;

  @Field(()=> Date, { nullable: true})
  createdAt?: Date;

  @Field(()=> Date, { nullable: true})
  updatedAt?: Date;

  @Field({nullable: true})
  submit?: string;

  @Field({nullable: true})
  dismiss?: string;

  @Field({nullable: true})
  action?: string;

  @Field({nullable: true})
  priority?: string;

}
