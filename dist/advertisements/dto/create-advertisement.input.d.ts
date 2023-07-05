import Upload from 'src/constants/Upload';
import { advertisementsTypes } from 'src/constants/types.type';
import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare class CreateAdvertisementInput {
    meal?: string | Meal;
    restaurant?: string | Restaurant;
    user?: string;
    title: string;
    titleEN: string;
    titleKR?: string;
    image?: Upload;
    type?: advertisementsTypes;
}
