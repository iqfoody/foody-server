import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MealsService } from './meals.service';
import { Meal } from './entities/meal.entity';
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { LimitEntity } from 'src/constants/limitEntity';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { MealsResponse } from './entities/mealsResponse.entity';
import { CreateMealObject } from './dto/create-meal-object.input';
import { UpdateMealObject } from './dto/update-meal-object.input';
import { RemoveMealObject } from './dto/remove-mea-object.input';
import { MealAddition } from './entities/meal-addition.entity';

@UseGuards(AccessAuthGuard)
@Resolver(() => Meal)
export class MealsResolver {
  constructor(private readonly mealsService: MealsService) {}

  @Mutation(() => Meal)
  @CheckAbilities({actions: Actions.Create, subject: Meal})
  createMeal(@Args('createMealInput') createMealInput: CreateMealInput) {
    return this.mealsService.create(createMealInput);
  }

  @Query(() => MealsResponse, { name: 'meals' })
  @CheckAbilities({actions: Actions.Read, subject: Meal})
  findAll(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.mealsService.findAll(limitEntity);
  }

  @Query(() => MealsResponse, { name: 'mealsRestaurant' })
  @CheckAbilities({actions: Actions.Read, subject: Meal})
  findAllForRestaurant(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.mealsService.findAllForRestaurant(limitEntity);
  }

  @Query(() => [Meal], { name: 'searchMeals' })
  @CheckAbilities({actions: Actions.Read, subject: Meal})
  search(@Args('query', {type: ()=> String}) query: string) {
    return this.mealsService.search(query);
  }

  @Query(() => Meal, { name: 'meal' })
  @CheckAbilities({actions: Actions.Read, subject: Meal})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.mealsService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Meal})
  updateMeal(@Args('updateMealInput') updateMealInput: UpdateMealInput) {
    return this.mealsService.update(updateMealInput.id, updateMealInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Meal})
  stateMeal(@Args('stateInput') stateInput: StateInput) {
    return this.mealsService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Meal})
  positionMeal(@Args('updatePositionInput', {type: ()=> [UpdatePositionInput]}) updatePositionInput: UpdatePositionInput[]) {
    return this.mealsService.position(updatePositionInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: Meal})
  removeMeal(@Args('id', { type: () => ID }) id: string) {
    return this.mealsService.remove(id);
  }

  @Mutation(() => MealAddition)
  @CheckAbilities({actions: Actions.Update, subject: Meal})
  createMealObject(@Args('createMealObject') createMealObject: CreateMealObject) {
    return this.mealsService.createMealObject(createMealObject);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Meal})
  updateMealObject(@Args('updateMealObject') updateMealObject: UpdateMealObject) {
    return this.mealsService.updateMealObject(updateMealObject);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Meal})
  removeMealObject(@Args('removeMealObject') removeMealObject: RemoveMealObject) {
    return this.mealsService.removeMealObject(removeMealObject);
  }

}
