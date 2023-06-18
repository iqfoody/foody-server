import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesSchema } from 'src/models/favorites.schema';
import { UsersModule } from 'src/users/users.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Favorites", schema: FavoritesSchema }]),
    forwardRef(() => UsersModule),
    FirebaseModule
  ],
  providers: [FavoritesResolver, FavoritesService],
  exports: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
