import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSettingInput {

  @Field()
  support: string;
  
}
