import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { promoCodeTypes } from 'src/constants/types.type';

@InputType()
export class CreatePromoCodeInput {

  @Field()
  name: string;

  @Field(()=> ID, {nullable: true})
  user?: string;

  @Field()
  type: promoCodeTypes;

  @Field(()=> Int)
  discount: number;

  @Field(()=> Int, {nullable: true})
  usageTimes?: number;

  @Field(()=> Boolean, {nullable: true})
  isPublic?: boolean;

  @Field(()=> Date)
  expire: Date;
  
}
