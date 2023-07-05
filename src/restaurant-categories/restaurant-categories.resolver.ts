import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RestaurantCategoriesService } from './restaurant-categories.service';
import { RestaurantCategory } from './entities/restaurant-category.entity';
import { CreateRestaurantCategoryInput } from './dto/create-restaurant-category.input';
import { UpdateRestaurantCategoryInput } from './dto/update-restaurant-category.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { UpdatePositionInput } from 'src/constants/position.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => RestaurantCategory)
export class RestaurantCategoriesResolver {
  constructor(private readonly restaurantCategoriesService: RestaurantCategoriesService) {}

  @Mutation(() => RestaurantCategory)
  @CheckAbilities({actions: Actions.Create, subject: "Restaurant"})
  createRestaurantCategory(@Args('createRestaurantCategoryInput') createRestaurantCategoryInput: CreateRestaurantCategoryInput) {
    return this.restaurantCategoriesService.create(createRestaurantCategoryInput);
  }

  @Query(() => [RestaurantCategory], { name: 'restaurantCategories' })
  @CheckAbilities({actions: Actions.Read, subject: "Restaurant"})
  findAll(@Args('id', {type: ()=> ID}) id: string) {
    return this.restaurantCategoriesService.findAll(id);
  }

  @Query(() => RestaurantCategory, { name: 'restaurantCategory' })
  @CheckAbilities({actions: Actions.Read, subject: "Restaurant"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't restaurant category with this id");
    return this.restaurantCategoriesService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Restaurant"})
  updateRestaurantCategory(@Args('updateRestaurantCategoryInput') updateRestaurantCategoryInput: UpdateRestaurantCategoryInput) {
    if(!isValidObjectId(updateRestaurantCategoryInput?.id)) throw new BadRequestException("There isn't restaurant category with this id");
    return this.restaurantCategoriesService.update(updateRestaurantCategoryInput.id, updateRestaurantCategoryInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Restaurant"})
  positionRestaurantCategory(@Args('updatePositionInput', {type: ()=> [UpdatePositionInput]}) updatePositionInput: UpdatePositionInput[]) {
    return this.restaurantCategoriesService.position(updatePositionInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Restaurant"})
  removeRestaurantCategory(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't restaurant category with this id");
    return this.restaurantCategoriesService.remove(id);
  }
}
