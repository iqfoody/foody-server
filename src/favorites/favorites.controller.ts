import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Favorite } from './entities/favorite.entity';
import { Actions } from 'src/ability/ability.factory';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';

@UseGuards(AccessAuthGuard)
@Controller('favorites')
export class FavoritesController {
    constructor(
        private readonly favoritesService: FavoritesService,
    ){}

    @Get('/')
    @CheckAbilities({actions: Actions.Info, subject: Favorite})
    async getFavorites(@Req() context) {
      return this.favoritesService.findFavorite(context.user._id);
    }

    @Post('/')
    @CheckAbilities({actions: Actions.Edit, subject: Favorite})
    async updateFavorite(@Body('updateFavoriteInput') updateFavoriteInput: UpdateFavoriteInput, @Req() context) {
      console.log(updateFavoriteInput);
      return this.favoritesService.addFavorite(updateFavoriteInput, context.user._id);
    }
}
