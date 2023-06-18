import { Module, forwardRef } from '@nestjs/common';
import { PromoCodesService } from './promo-codes.service';
import { PromoCodesResolver } from './promo-codes.resolver';
import { PromoCodesController } from './promo-codes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoCodesSchema } from 'src/models/promoCodes.schema';
import { UsersModule } from 'src/users/users.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "PromoCodes", schema: PromoCodesSchema }]),
    forwardRef(() => UsersModule),
    FirebaseModule
  ],
  providers: [PromoCodesResolver, PromoCodesService],
  exports: [PromoCodesService],
  controllers: [PromoCodesController]
})
export class PromoCodesModule {}
