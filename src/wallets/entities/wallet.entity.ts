import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Wallet {
  
  @Field(() => ID)
  _id: string;

  @Field(() => ID, {nullable: true})
  user?: string;

  @Field(() => ID, {nullable: true})
  driver?: string;

  @Field(() => ID, {nullable: true})
  admin?: string;

  @Field(()=> Int)
  points: number;

  @Field(()=> Int)
  amount: number;

  @Field(()=> Date, {nullable: true})
  createdAt?: Date;

  @Field(()=> Date, {nullable: true})
  updatedAt?: Date;

}
