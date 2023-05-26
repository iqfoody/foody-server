import { Module, forwardRef } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsSchema } from 'src/models/restaurants.schema';
import { AwsModule } from 'src/aws/aws.module';
import { RestaurantCategoriesModule } from 'src/restaurant-categories/restaurant-categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Restaurants", schema: RestaurantsSchema }]),
    forwardRef(() => RestaurantCategoriesModule),
    AwsModule,
  ],
  providers: [RestaurantsResolver, RestaurantsService],
  exports: [RestaurantsService],
  controllers: [RestaurantsController]
})
export class RestaurantsModule {}
