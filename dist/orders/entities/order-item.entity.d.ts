import { MealIngredient } from "src/meals/entities/meal-ingredient.entity";
import { Meal } from "src/meals/entities/meal.entity";
import { OrderMealAddition } from "./order-meal-addition.entity";
export declare class OrderItem {
    meal: string | Meal;
    additions?: OrderMealAddition[];
    addIngredients?: MealIngredient[];
    removeIngredients?: MealIngredient[];
    quantity: number;
}
