import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/models/users.schema';
import { UsersController } from './users.controller';
import { AwsModule } from 'src/aws/aws.module';
import { WalletsModule } from 'src/wallets/wallets.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Users", schema: UsersSchema }]),
    forwardRef(() => WalletsModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => AddressesModule),
    AwsModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
