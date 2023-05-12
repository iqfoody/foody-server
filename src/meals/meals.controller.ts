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
    async getMealsInfinty(@Query('limit') limit: number, @Query('page') page: number){
        return this.mealsService.findMealsInfinty({limit, page})
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

    @Post('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Meal})
    @UseInterceptors(FileInterceptor('image'))
    async createMeal(@Body('createMealInput') createMealInput: CreateMealInput, @UploadedFile() file) {
        //const additions = [{title: "بطاطا", titleEN: "Batata", price: 3000 },{title: "بطاطا", titleEN: "Batata", price: 2000 }, ];
        //const ingredients = [{title: "خس", titleEN: "Lettuce"}, {title: "طماطم", titleEN: "Tomato" }];
        return this.mealsService.create(createMealInput, file);
    }

    @Put('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Update, subject: Meal})
    @UseInterceptors(FileInterceptor('image'))
    async updateMeal(@Body('updateMealInput') updateMealInput: UpdateMealInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateMealInput.id);
      return this.mealsService.update(updateMealInput.id, {...updateMealInput, image: result?.Key});
    }

}
