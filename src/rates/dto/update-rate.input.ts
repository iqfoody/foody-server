import { CreateRateInput } from './create-rate.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRateInput extends PartialType(CreateRateInput) {
  @Field(() => ID)
  id: string;
}
