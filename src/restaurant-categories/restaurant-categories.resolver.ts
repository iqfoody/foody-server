import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RestaurantCategoriesService } from './restaurant-categories.service';
import { RestaurantCategory } from './entities/restaurant-category.entity';
import { CreateRestaurantCategoryInput } from './dto/create-restaurant-category.input';
import { UpdateRestaurantCategoryInput } from './dto/update-restaurant-category.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { UpdatePositionInput } from 'src/constants/position.input';

@UseGuards(AccessAuthGuard)
@Resolver(() => RestaurantCategory)
export class RestaurantCategoriesResolver {
  constructor(private readonly restaurantCategoriesService: RestaurantCategoriesService) {}

  @Mutation(() => RestaurantCategory)
  @CheckAbilities({actions: Actions.Create, subject: RestaurantCategory})
  createRestaurantCategory(@Args('createRestaurantCategoryInput') createRestaurantCategoryInput: CreateRestaurantCategoryInput) {
    return this.restaurantCategoriesService.create(createRestaurantCategoryInput);
  }

  @Query(() => [RestaurantCategory], { name: 'restaurantCategories' })
  @CheckAbilities({actions: Actions.Read, subject: RestaurantCategory})
  findAll(@Args('id', {type: ()=> ID}) id: string) {
    return this.restaurantCategoriesService.findAll(id);
  }

  @Query(() => RestaurantCategory, { name: 'restaurantCategory' })
  @CheckAbilities({actions: Actions.Read, subject: RestaurantCategory})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantCategoriesService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: RestaurantCategory})
  updateRestaurantCategory(@Args('updateRestaurantCategoryInput') updateRestaurantCategoryInput: UpdateRestaurantCategoryInput) {
    return this.restaurantCategoriesService.update(updateRestaurantCategoryInput.id, updateRestaurantCategoryInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: RestaurantCategory})
  positionRestaurantCategory(@Args('updatePositionInput', {type: ()=> [UpdatePositionInput]}) updatePositionInput: UpdatePositionInput[]) {
    return this.restaurantCategoriesService.position(updatePositionInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: RestaurantCategory})
  removeRestaurantCategory(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantCategoriesService.remove(id);
  }
}
