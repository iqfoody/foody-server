import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class SearchesService {
  constructor(
    @Inject(forwardRef(() => MealsService)) private mealsService: MealsService,
    @Inject(forwardRef(() => RestaurantsService)) private RestaurantsService: RestaurantsService,
  ) {}

  create(createSearchInput: CreateSearchInput) {
    return 'This action adds a new search';
  }

  findAll() {
    return `This action returns all searches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchInput: UpdateSearchInput) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
