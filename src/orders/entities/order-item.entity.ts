import { Field, Int, ObjectType } from "@nestjs/graphql";
import { MealAddition } from "src/meals/entities/meal-addition.entity";
import { MealIngredient } from "src/meals/entities/meal-ingredient.entity";
import { Meal } from "src/meals/entities/meal.entity";

@ObjectType()
export class OrderItem {

    @Field(()=> String || Meal)
    meal: string | Meal;

    @Field(()=> [String], {nullable: true})
    additions?: string[];

    @Field(()=> [String], {nullable: true})
    addIngredients?: string[];

    @Field(()=> [String], {nullable: true})
    removeIngredients?: string[];

    @Field(()=> Int)
    quantity: number;

}