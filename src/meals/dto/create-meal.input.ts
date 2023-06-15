import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateMealIngredientInput } from './create-meal-ingredient.input';
import { CreateMealAdditionInput } from './create-meal-addition.input';

@InputType()
export class CreateMealInput {

  @Field(()=> ID, {nullable: true})
  category?: string;
  
  @Field(()=> ID)
  restaurant: string;

  @Field(()=> ID, {nullable: true})
  tag?: string;

  @Field(()=> ID)
  restaurantCategory: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field()
  description: string;

  @Field()
  descriptionEN: string;

  @Field({nullable: true})
  descriptionKR?: string;

  @Field({nullable: true})
  image?: string;

  @Field(()=> [CreateMealAdditionInput], {nullable: true})
  additions?: CreateMealAdditionInput[];

  @Field(()=> [CreateMealIngredientInput], {nullable: true})
  ingredients?: CreateMealIngredientInput[];

  @Field(()=> Int)
  price: number;

  @Field(()=> Int, {nullable: true})
  previousPrice?: number;

  @Field(()=> Int, {nullable: true})
  points?: number;

  @Field(()=> Int, {nullable: true})
  pointsBack?: number;

  // -> after update 1...

  @Field(()=> Int)
  discount: number;

}
