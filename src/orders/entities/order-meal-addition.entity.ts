import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { MealAddition } from 'src/meals/entities/meal-addition.entity';

@ObjectType()
export class OrderMealAddition {

  @Field(()=> MealAddition)
  addition: MealAddition;

  @Field(()=> Int)
  quantity?: number;

}
