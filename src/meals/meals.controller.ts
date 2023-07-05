import { Controller, Get, Param, Query } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
    constructor(
        private readonly mealsService: MealsService,
    ){}

    @Get('/main')
    async getMealsInfinty(@Query('limit') limit: number, @Query('page') page: number, @Query('orderBy') orderBy: string){
        return this.mealsService.findMealsInfinty({limit, page, orderBy})
    }

    @Get('/restaurant/:id')
    async getRestaurants(@Param('id') restaurant: string){
        return this.mealsService.findForRestaurant(restaurant);
    }

    @Get('/tag/:id')
    async getTags(@Param('id') tag: string){
        return this.mealsService.findForTag(tag);
    }

    @Get('/restaurantCategory/:id')
    async getrestaurantCategory(@Param('id') restaurantCategory: string){
        return this.mealsService.findForRestaurantCategory(restaurantCategory);
    }

    @Get('/:id')
    async getMeal(@Param('id') id: string){
        return this.mealsService.findMeal(id);
    }

}
