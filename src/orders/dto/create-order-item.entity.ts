import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateMealAdditionInput } from 'src/meals/dto/create-meal-addition.input';
import { CreateMealIngredientInput } from 'src/meals/dto/create-meal-ingredient.input';

@InputType()
export class CreateOrderItemInput {
  
  @Field(() => ID)
  meal: string;

  @Field(()=> [String], {nullable: true})
  additions?: string[];

  @Field(()=> [String], {nullable: true})
  addIngredients?: string[];

  @Field(()=> [String], {nullable: true})
  removeIngredients?: string[];

  @Field(()=> Int)
  quantity: number;

}