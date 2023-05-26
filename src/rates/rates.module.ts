import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesResolver } from './rates.resolver';
import { RatesController } from './rates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RatesSchema } from 'src/models/rates.schema';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Rates", schema: RatesSchema }]),
    AwsModule
  ],
  providers: [RatesResolver, RatesService],
  exports: [RatesService],
  controllers: [RatesController]
})
export class RatesModule {}
