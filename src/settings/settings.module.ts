import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsResolver } from './settings.resolver';
import { SettingsController } from './settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsSchema } from 'src/models/settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Settings", schema: SettingsSchema }]),
  ],
  providers: [SettingsResolver, SettingsService],
  exports: [SettingsService],
  controllers: [SettingsController]
})
export class SettingsModule {}
