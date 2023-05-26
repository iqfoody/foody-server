import { InputType, Int, Field } from '@nestjs/graphql';
import { adminTypes } from 'src/constants/types.type';

@InputType()
export class CreateAdminInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  type: adminTypes;

  @Field({nullable: true})
  image?: string;
}
