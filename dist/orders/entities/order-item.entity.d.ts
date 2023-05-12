import { Meal } from "src/meals/entities/meal.entity";
export declare class OrderItem {
    meal: string | Meal;
    additions?: string[];
    addIngredients?: string[];
    removeIngredients?: string[];
    quantity: number;
}
