import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsResolver } from './advertisements.resolver';
import { AdvertisementsController } from './advertisements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertisementsSchema } from 'src/models/advertisements.schema';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Advertisements", schema: AdvertisementsSchema }]),
    AwsModule,
  ],
  providers: [AdvertisementsResolver, AdvertisementsService],
  exports: [AdvertisementsService],
  controllers: [AdvertisementsController]
})
export class AdvertisementsModule {}
