import { Controller, Get, Query } from '@nestjs/common';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Controller('searches')
export class SearchesController {

    constructor(
        private readonly restaurantsService: RestaurantsService,
        private readonly mealsService: MealsService,
    ) {}

    @Get('/search')
    async search(@Query('search') query: string){
        if(!query || query?.length <= 2 || query?.length >= 15) return
        const restaurants = await this.restaurantsService.search(query);
        const meals = await this.mealsService.search(query);
        return [...restaurants, ...meals];
    }

}
