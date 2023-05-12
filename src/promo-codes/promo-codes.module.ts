import { Module } from '@nestjs/common';
import { PromoCodesService } from './promo-codes.service';
import { PromoCodesResolver } from './promo-codes.resolver';
import { PromoCodesController } from './promo-codes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoCodesSchema } from 'src/models/promoCodes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "PromoCodes", schema: PromoCodesSchema }]),
  ],
  providers: [PromoCodesResolver, PromoCodesService],
  exports: [PromoCodesService],
  controllers: [PromoCodesController]
})
export class PromoCodesModule {}
