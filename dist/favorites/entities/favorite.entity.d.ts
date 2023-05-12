import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Favorite {
    _id: string;
    user: string | User;
    restaurants?: string | Restaurant[];
    meals?: string | Meal[];
}
