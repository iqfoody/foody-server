import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateWalletInput {
  
  @Field(() => ID)
  _id: string;

}
