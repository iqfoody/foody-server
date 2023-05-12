import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { MealAddition } from './meal-addition.entity';
import { MealIngredient } from './meal-ingredient.entity';
import { mealStatus } from 'src/constants/types.type';
import { Tag } from 'src/tags/entities/tag.entity';
import { RestaurantCategory } from 'src/restaurant-categories/entities/restaurant-category.entity';
export declare class Meal {
    _id: string;
    restaurant: string | Restaurant;
    tag?: string | Tag;
    restaurantCategory: string | RestaurantCategory;
    title: string;
    titleEN: string;
    titleKR?: string;
    description: string;
    descriptionEN: string;
    descriptionKR?: string;
    image: string;
    additions?: MealAddition[];
    ingredients?: MealIngredient[];
    price: number;
    previousPrice?: number;
    points?: number;
    pointsBack?: number;
    position?: number;
    state: mealStatus;
}
