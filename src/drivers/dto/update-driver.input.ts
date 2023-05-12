import { CreateDriverInput } from './create-driver.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  
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
