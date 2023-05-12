import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Wallet {
  
  @Field(() => ID)
  _id: string;

  @Field(()=> Int)
  points: number;

  @Field(()=> Int)
  amount: number;

}
