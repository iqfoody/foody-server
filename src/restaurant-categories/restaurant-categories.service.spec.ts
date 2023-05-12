import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantCategoriesService } from './restaurant-categories.service';

describe('RestaurantCategoriesService', () => {
  let service: RestaurantCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantCategoriesService],
    }).compile();

    service = module.get<RestaurantCategoriesService>(RestaurantCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
