import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantCategoriesController } from './restaurant-categories.controller';

describe('RestaurantCategoriesController', () => {
  let controller: RestaurantCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantCategoriesController],
    }).compile();

    controller = module.get<RestaurantCategoriesController>(RestaurantCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
