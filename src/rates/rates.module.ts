import { Module, forwardRef } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesResolver } from './rates.resolver';
import { RatesController } from './rates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RatesSchema } from 'src/models/rates.schema';
import { AwsModule } from 'src/aws/aws.module';
import { UsersModule } from 'src/users/users.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Rates", schema: RatesSchema }]),
    forwardRef(()=> UsersModule),
    AwsModule,
    FirebaseModule
  ],
  providers: [RatesResolver, RatesService],
  exports: [RatesService],
  controllers: [RatesController]
})
export class RatesModule {}
