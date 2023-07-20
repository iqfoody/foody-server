import { Module, forwardRef } from '@nestjs/common';
import { RestaurantCategoriesService } from './restaurant-categories.service';
import { RestaurantCategoriesResolver } from './restaurant-categories.resolver';
import { RestaurantCategoriesController } from './restaurant-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantCategoriesSchema } from 'src/models/restaurantCategories.schema';
import { MealsModule } from 'src/meals/meals.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "RestaurantCategories", schema: RestaurantCategoriesSchema }]),
    forwardRef(()=> MealsModule)
  ],
  providers: [RestaurantCategoriesResolver, RestaurantCategoriesService],
  exports: [RestaurantCategoriesService],
  controllers: [RestaurantCategoriesController]
})
export class RestaurantCategoriesModule {}
