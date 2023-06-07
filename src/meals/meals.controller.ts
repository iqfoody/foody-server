import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MealsService } from './meals.service';
import { AwsService } from 'src/aws/aws.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateMealInput } from './dto/update-meal.input';
import { CreateMealInput } from './dto/create-meal.input';
import { Meal } from './entities/meal.entity';

@Controller('meals')
export class MealsController {
    constructor(
        private readonly mealsService: MealsService,
        private readonly awsService: AwsService,
    ){}

    @Get('/main')
    //@Query('limit') limit: number, @Query('page') page: number
    async getMealsInfinty(){
        return this.mealsService.findMealsInfinty({limit: 10, page: 0})
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

    // dashboard...

    @Post('/:id')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Meal})
    @UseInterceptors(FileInterceptor('image'))
    async createMeal(@Param('id') id: string, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, id);
        return this.mealsService.createImage(id, result?.Key);
    }

    @Put('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Update, subject: Meal})
    @UseInterceptors(FileInterceptor('image'))
    async updateMeal(@Body() updateMealInput: UpdateMealInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateMealInput.id);
      return this.mealsService.update(updateMealInput.id, {...updateMealInput, image: result?.Key});
    }

}
