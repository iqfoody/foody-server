import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Mutation(() => Restaurant)
  @CheckAbilities({actions: Actions.Create, subject: "Restaurant"})
  createRestaurant(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantsService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  @CheckAbilities({actions: Actions.Read, subject: "Restaurant"})
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Query(() => [Restaurant], { name: 'searchRestaurants' })
  @CheckAbilities({actions: Actions.Read, subject: "Restaurant"})
  search(@Args('query', {type: ()=> String}) query: string) {
    return this.restaurantsService.search(query);
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  @CheckAbilities({actions: Actions.Read, subject: "Restaurant"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't restaurant with this id");
    return this.restaurantsService.findOne(id);
  }

  @Mutation(() => Restaurant)
  @CheckAbilities({actions: Actions.Update, subject: "Restaurant"})
  updateRestaurant(@Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    if(!isValidObjectId(updateRestaurantInput?.id)) throw new BadRequestException("There isn't restaurant with this id");
    return this.restaurantsService.update(updateRestaurantInput.id, updateRestaurantInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Restaurant"})
  stateRestaurant(@Args('stateInput') stateInput: StateInput) {
    if(!isValidObjectId(stateInput?.id)) throw new BadRequestException("There isn't restaurant with this id");
    return this.restaurantsService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Restaurant"})
  positionRestaurant(@Args('updatePositionInput', {type: ()=> [UpdatePositionInput]}) updatePositionInput: UpdatePositionInput[]) {
    return this.restaurantsService.position(updatePositionInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Restaurant"})
  removeRestaurant(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't restaurant with this id");
    return this.restaurantsService.remove(id);
  }
}
