import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateWalletInput {
  
  @Field(() => ID, {nullable: true})
  user?: string;

  @Field(() => ID, {nullable: true})
  driver?: string;

  @Field(() => ID, {nullable: true})
  admin?: string;

}
