import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Admin } from 'src/admins/entities/admin.entity';
import { paymentMethodsType, procedureTypes, transactionTypes } from 'src/constants/types.type';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Transaction {

  @Field(() => ID)
  _id: string;

  @Field(() => User, {nullable: true})
  user?: string | User;

  @Field(() => Admin, {nullable: true})
  admin?: string | Admin;

  @Field(() => Driver, {nullable: true})
  driver?: string | Driver;

  @Field(() => Order, {nullable: true})
  order?: string | Order;

  @Field()
  type: transactionTypes;

  @Field()
  procedure: procedureTypes;

  @Field(()=> Int)
  amount: number;

  @Field(()=> Int)
  previous: number;

  @Field()
  description: string;

  @Field({nullable: true})
  paymentMethod?: paymentMethodsType;

  @Field()
  state: string;

  @Field(()=> Date, {nullable: true})
  createdAt?: Date;

  @Field(()=> Date, {nullable: true})
  updatedAt?: Date;

}
