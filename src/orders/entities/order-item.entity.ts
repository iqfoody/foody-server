import { Field, Int, ObjectType } from "@nestjs/graphql";
import { MealAddition } from "src/meals/entities/meal-addition.entity";
import { MealIngredient } from "src/meals/entities/meal-ingredient.entity";
import { Meal } from "src/meals/entities/meal.entity";
import { OrderMealAddition } from "./order-meal-addition.entity";

@ObjectType()
export class OrderItem {

    @Field(()=> Meal)
    meal: string | Meal;

    @Field(()=> [OrderMealAddition], {nullable: true})
    additions?: OrderMealAddition[];

    @Field(()=> [MealIngredient], {nullable: true})
    addIngredients?: MealIngredient[];

    @Field(()=> [MealIngredient], {nullable: true})
    removeIngredients?: MealIngredient[];

    @Field(()=> Int)
    quantity: number;

}