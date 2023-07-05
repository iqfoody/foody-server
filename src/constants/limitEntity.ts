import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { storeOrdersStatus } from './types.type';

@InputType()
export class LimitEntity {

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field({nullable: true})
  orderBy?: string;

  @Field({nullable: true})
  state?: storeOrdersStatus;

  @Field(() => ID, {nullable: true})
  user?: string;
}
