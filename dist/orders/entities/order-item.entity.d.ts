import { MealAddition } from "src/meals/entities/meal-addition.entity";
import { MealIngredient } from "src/meals/entities/meal-ingredient.entity";
import { Meal } from "src/meals/entities/meal.entity";
export declare class OrderItem {
    meal: string | Meal;
    additions?: MealAddition[];
    addIngredients?: MealIngredient[];
    removeIngredients?: MealIngredient[];
    quantity: number;
}
