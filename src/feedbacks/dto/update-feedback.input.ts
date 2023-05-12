import { CreateFeedbackInput } from './create-feedback.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateFeedbackInput extends PartialType(CreateFeedbackInput) {
  @Field(() => ID)
  id: string;
}
