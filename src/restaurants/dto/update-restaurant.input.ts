import { CreateRestaurantInput } from './create-restaurant.input';
import { InputType, Field, PartialType, ID, Float, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {

  @Field(() => ID, {nullable: true})
  id?: string;

  @Field(()=> Float, {nullable: true})
  rating?: number

  @Field(()=> Int, {nullable: true})
  rates?: number

}
