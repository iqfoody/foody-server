import { CreateAdminInput } from './create-admin.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {

  @Field(() => ID, {nullable: true})
  id?: string;

  @Field({ nullable: true })
  ip?: string;

  @Field({ nullable: true })
  platform?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  deviceToken?: string;
}
