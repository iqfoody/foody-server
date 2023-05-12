import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesResolver } from './rates.resolver';
import { RatesController } from './rates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RatesSchema } from 'src/models/rates.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Rates", schema: RatesSchema }]),
  ],
  providers: [RatesResolver, RatesService],
  exports: [RatesService],
  controllers: [RatesController]
})
export class RatesModule {}
