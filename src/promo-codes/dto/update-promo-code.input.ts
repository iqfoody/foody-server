import { CreatePromoCodeInput } from './create-promo-code.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePromoCodeInput extends PartialType(CreatePromoCodeInput) {

  @Field(() => ID)
  id: string;

}
