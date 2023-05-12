import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInfo {

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  phoneNumber?: string;

  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  image?: string;

}
