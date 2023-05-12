import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class PasswordUserInput {

  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  oldPassword: string;

  @Field()
  password: string;
}