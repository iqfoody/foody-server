import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRateOrderInput {
  
  @Field(() => ID)
  user: string;

  @Field(() => ID)
  order: string;

  @Field(() => Int)
  rate: number;

  @Field({nullable: true})
  description?: string

}
