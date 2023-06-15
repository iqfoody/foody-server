import { CreateAdvertisementInput } from './create-advertisement.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAdvertisementInput extends PartialType(CreateAdvertisementInput) {

  @Field(() => ID, {nullable: true})
  id: string;

}
