import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesSchema } from 'src/models/favorites.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Favorites", schema: FavoritesSchema }]),
  ],
  providers: [FavoritesResolver, FavoritesService],
  exports: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
