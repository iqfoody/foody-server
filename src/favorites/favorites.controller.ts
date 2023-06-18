import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('favorites')
export class FavoritesController {
    constructor(
        private readonly favoritesService: FavoritesService,
    ){}

    @Get('/')
    async getFavorites(@Req() context) {
      return this.favoritesService.findFavorite(context.user);
    }

    @Post('/')
    async updateFavorite(@Body('updateFavoriteInput') updateFavoriteInput: UpdateFavoriteInput, @Req() context) {
      return this.favoritesService.addFavorite(updateFavoriteInput, context.user);
    }
}
