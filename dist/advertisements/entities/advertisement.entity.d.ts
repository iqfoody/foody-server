import { advertisementsTypes, publicStatus } from 'src/constants/types.type';
import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Advertisement {
    _id: string;
    meal?: string | Meal;
    restaurant?: string | Restaurant;
    user?: string | User;
    title: string;
    titleEN: string;
    titleKR?: string;
    image: string;
    type?: advertisementsTypes;
    position: number;
    state: publicStatus;
}
