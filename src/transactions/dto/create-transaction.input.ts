import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { paymentMethodsType, procedureTypes, transactionTypes } from 'src/constants/types.type';

@InputType()
export class CreateTransactionInput {
  
  @Field(() => ID)
  user: string;

  @Field(() => ID, {nullable: true})
  admin?: string;

  @Field(() => ID, {nullable: true})
  order?: string;

  @Field()
  type: transactionTypes;

  @Field()
  procedure: procedureTypes;

  @Field(()=> Int)
  amount: number;

  @Field(()=> Int, {nullable: true})
  previous?: number;

  @Field()
  description: string;

  @Field({nullable: true})
  paymentMethod?: paymentMethodsType;

  @Field({nullable: true})
  state?: string;
}
