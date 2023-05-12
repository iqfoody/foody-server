import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantCategoriesService } from './restaurant-categories.service';

@Controller('restaurant-categories')
export class RestaurantCategoriesController {
    constructor(
        private readonly restaurantCategoriesService: RestaurantCategoriesService,
    ) {}

    @Get('/:id')
    async getRestaurantCategories(@Param('id') restaurant: string){
        return this.restaurantCategoriesService.findForRestaurant(restaurant);
    }

}
