import { CreateWalletInput } from './create-wallet.input';
import { InputType, Field, PartialType, ID, Int } from '@nestjs/graphql';

@InputType()
export class UpdateWalletInput extends PartialType(CreateWalletInput) {

  @Field(() => ID, {nullable: true})
  id?: string;

  @Field(() => Int, {nullable: true})
  amount?: number;

  @Field(() => Int, {nullable: true})
  points?: number;
  
}
