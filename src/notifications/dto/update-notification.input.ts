import { CreateNotificationInput } from './create-notification.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput extends PartialType(CreateNotificationInput) {
  @Field(() => ID)
  id: string;
}
