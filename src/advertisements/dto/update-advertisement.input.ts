import { CreateAdvertisementInput } from './create-advertisement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdvertisementInput extends PartialType(CreateAdvertisementInput) {

  @Field(() => Int, {nullable: true})
  id: string;

}
