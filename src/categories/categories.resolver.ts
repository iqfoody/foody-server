import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { UpdateCategoryInput } from './dto/update-category.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { CreateCategoryInput } from './dto/create-category.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  @CheckAbilities({actions: Actions.Create, subject: "Category"})
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput)
  }

  @Query(() => [Category], { name: 'categories' })
  @CheckAbilities({actions: Actions.Read, subject: "Category"})
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  @CheckAbilities({actions: Actions.Read, subject: "Category"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't category with this id");
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  @CheckAbilities({actions: Actions.Update, subject: "Category"})
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    if(!isValidObjectId(updateCategoryInput?.id)) throw new BadRequestException("There isn't category with this id");
    return this.categoriesService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Category"})
  positionCategory(@Args('updatePositionInput', {type: ()=> [UpdatePositionInput]}) updatePositionInput: UpdatePositionInput[]) {
    return this.categoriesService.position(updatePositionInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Category"})
  stateCategory(@Args('stateInput') stateInput: StateInput) {
    if(!isValidObjectId(stateInput?.id)) throw new BadRequestException("There isn't category with this id");
    return this.categoriesService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Category"})
  removeCategory(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't category with this id");
    return this.categoriesService.remove(id);
  }
}
