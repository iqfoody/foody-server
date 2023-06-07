import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Rate {
    _id: string;
    user: string | User;
    restaurant: string | Restaurant;
    rate: number;
    description?: string;
}
