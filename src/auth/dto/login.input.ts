import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  password?: string;

  @Field({nullable: true})
  deviceToken?: string;
}

