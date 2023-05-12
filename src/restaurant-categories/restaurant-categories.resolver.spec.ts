import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantCategoriesResolver } from './restaurant-categories.resolver';
import { RestaurantCategoriesService } from './restaurant-categories.service';

describe('RestaurantCategoriesResolver', () => {
  let resolver: RestaurantCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantCategoriesResolver, RestaurantCategoriesService],
    }).compile();

    resolver = module.get<RestaurantCategoriesResolver>(RestaurantCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
