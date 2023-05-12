import { CreateMealInput } from './create-meal.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMealInput extends PartialType(CreateMealInput) {

  @Field(() => ID)
  id: string;
  
}
