import { CreateMealIngredientInput } from './create-meal-ingredient.input';
import { CreateMealAdditionInput } from './create-meal-addition.input';
import Upload from 'src/constants/Upload';
export declare class CreateMealInput {
    category?: string;
    restaurant: string;
    tag?: string;
    restaurantCategory: string;
    title: string;
    titleEN: string;
    titleKR?: string;
    description: string;
    descriptionEN: string;
    descriptionKR?: string;
    image: Upload;
    additions?: CreateMealAdditionInput[];
    ingredients?: CreateMealIngredientInput[];
    price: number;
    previousPrice?: number;
    points?: number;
    pointsBack?: number;
    discount: number;
}
