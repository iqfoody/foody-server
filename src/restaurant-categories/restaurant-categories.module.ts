import { Module } from '@nestjs/common';
import { RestaurantCategoriesService } from './restaurant-categories.service';
import { RestaurantCategoriesResolver } from './restaurant-categories.resolver';
import { RestaurantCategoriesController } from './restaurant-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantCategoriesSchema } from 'src/models/restaurantCategories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "RestaurantCategories", schema: RestaurantCategoriesSchema }]),
  ],
  providers: [RestaurantCategoriesResolver, RestaurantCategoriesService],
  exports: [RestaurantCategoriesService],
  controllers: [RestaurantCategoriesController]
})
export class RestaurantCategoriesModule {}
