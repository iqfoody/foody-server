import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AdminPermissionsInput {

  @Field()
  object: string;

  @Field(()=> [String])
  abilities: string[];

}
