import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class StateInput {

  @Field(() => ID)
  id: string;

  @Field()
  state: string;
}
