import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Favorite)
export class FavoritesResolver {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Mutation(() => Favorite)
  @CheckAbilities({actions: Actions.Create, subject: Favorite})
  createFavorite(@Args('createFavoriteInput') createFavoriteInput: CreateFavoriteInput) {
    return this.favoritesService.create(createFavoriteInput);
  }

  @Query(() => [Favorite], { name: 'favorites' })
  @CheckAbilities({actions: Actions.Read, subject: Favorite})
  findAll() {
    return this.favoritesService.findAll();
  }

  @Query(() => Favorite, { name: 'favorite' })
  @CheckAbilities({actions: Actions.Read, subject: Favorite})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.favoritesService.findOne(id);
  }

  @Mutation(() => Favorite)
  @CheckAbilities({actions: Actions.Delete, subject: Favorite})
  removeFavorite(@Args('id', { type: () => ID }) id: string) {
    return this.favoritesService.remove(id);
  }
}
