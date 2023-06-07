import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AwsService } from 'src/aws/aws.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { LimitEntity } from 'src/constants/limitEntity';

@Controller('restaurants')
export class RestaurantsController {
    constructor(
        private readonly restaurantsService: RestaurantsService,
        private readonly awsService: AwsService,
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

    // dashboard...

    @Post('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Restaurant})
    @UseInterceptors(FileInterceptor('image'))
    async createRestaurant(@Body() createRestaurantInput: CreateRestaurantInput, @UploadedFile() file) {
        return this.restaurantsService.create(createRestaurantInput, file);
    }

    @Put('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Update, subject: Restaurant})
    @UseInterceptors(FileInterceptor('image'))
    async updateRestaurant(@Body() updateRestaurantInput: UpdateRestaurantInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateRestaurantInput.id);
        return this.restaurantsService.update(updateRestaurantInput.id, {...updateRestaurantInput, image: result?.Key});
    }

}
