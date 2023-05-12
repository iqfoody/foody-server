import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MealsService } from './meals.service';
import { Meal } from './entities/meal.entity';
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Meal)
export class MealsResolver {
  constructor(private readonly mealsService: MealsService) {}

  @Mutation(() => Meal)
  @CheckAbilities({actions: Actions.Create, subject: Meal})
  createMeal(@Args('createMealInput') createMealInput: CreateMealInput) {
    return this.mealsService.create(createMealInput, null);
  }

  @Query(() => [Meal], { name: 'meals' })
  @CheckAbilities({actions: Actions.Read, subject: Meal})
  findAll() {
    return this.mealsService.findAll();
  }

  @Query(() => Meal, { name: 'meal' })
  @CheckAbilities({actions: Actions.Read, subject: Meal})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.mealsService.findOne(id);
  }

  @Mutation(() => Meal)
  @CheckAbilities({actions: Actions.Update, subject: Meal})
  updateMeal(@Args('updateMealInput') updateMealInput: UpdateMealInput) {
    return this.mealsService.update(updateMealInput.id, updateMealInput);
  }

  @Mutation(() => Meal)
  @CheckAbilities({actions: Actions.Delete, subject: Meal})
  removeMeal(@Args('id', { type: () => ID }) id: string) {
    return this.mealsService.remove(id);
  }
}
