import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsResolver } from './wallets.resolver';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsSchema } from 'src/models/wallets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Wallets", schema: WalletsSchema }]),
  ],
  providers: [WalletsResolver, WalletsService],
  exports: [WalletsService],
  controllers: [WalletsController]
})
export class WalletsModule {}
