import { Module, forwardRef } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesResolver } from './searches.resolver';
import { SearchesController } from './searches.controller';
import { MealsModule } from 'src/meals/meals.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [
    forwardRef(()=> MealsModule),
    forwardRef(()=> RestaurantsModule),
  ],
  providers: [SearchesResolver, SearchesService],
  exports: [SearchesService],
  controllers: [SearchesController]
})
export class SearchesModule {}
