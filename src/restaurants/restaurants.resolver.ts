import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Mutation(() => Restaurant)
  @CheckAbilities({actions: Actions.Create, subject: Restaurant})
  createRestaurant(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantsService.create(createRestaurantInput, null);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  @CheckAbilities({actions: Actions.Read, subject: Restaurant})
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  @CheckAbilities({actions: Actions.Read, subject: Restaurant})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Mutation(() => Restaurant)
  @CheckAbilities({actions: Actions.Update, subject: Restaurant})
  updateRestaurant(@Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    return this.restaurantsService.update(updateRestaurantInput.id, updateRestaurantInput);
  }

  @Mutation(() => Restaurant)
  @CheckAbilities({actions: Actions.Delete, subject: Restaurant})
  removeRestaurant(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantsService.remove(id);
  }
}
