import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
    constructor(
        private readonly restaurantsService: RestaurantsService,
    ){}

    @Get('/:id')
    async getRestaurant(@Param('id') restaurant: string){
        return this.restaurantsService.findRestaurant(restaurant);
    }
    
    @Get('/')
    async getRestaurants(){
        return this.restaurantsService.findRestaurnats();
    }

    @Get('/main')
    async getRestaurantsInfinty(@Query('limit') limit: number, @Query('page') page: number){
        return this.restaurantsService.findRestaurnatsInfinty({limit, page});
    }

}
