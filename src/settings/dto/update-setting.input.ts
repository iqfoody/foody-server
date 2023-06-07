import { CreateSettingInput } from './create-setting.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSettingInput extends PartialType(CreateSettingInput) {

  @Field(() => ID)
  id: string;

}
