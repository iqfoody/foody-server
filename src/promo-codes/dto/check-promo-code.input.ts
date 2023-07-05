import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { promoCodeTypes } from 'src/constants/types.type';

@InputType()
export class CheckPromoCodeInput {

  @Field()
  name: string;

  @Field(()=> ID, {nullable: true})
  user?: string;
  
}