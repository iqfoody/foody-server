import { RestaurantCategoriesService } from './restaurant-categories.service';
export declare class RestaurantCategoriesController {
    private readonly restaurantCategoriesService;
    constructor(restaurantCategoriesService: RestaurantCategoriesService);
    getRestaurantCategories(restaurant: string): Promise<any[]>;
}
