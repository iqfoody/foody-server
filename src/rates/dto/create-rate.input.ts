import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRateInput {
  
  @Field(() => ID)
  user: string;

  @Field(() => ID, {nullable: true})
  restaurant?: string;

  @Field(() => ID, {nullable: true})
  driver?: string;

  @Field(() => Int)
  rate: number;

  @Field({nullable: true})
  description?: string

}
