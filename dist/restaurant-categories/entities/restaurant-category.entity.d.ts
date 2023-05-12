import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare class RestaurantCategory {
    _id: string;
    restaurant: string | Restaurant;
    title: string;
    titleEN: string;
    titleKR?: string;
    position: number;
}
