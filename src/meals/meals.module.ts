import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsResolver } from './meals.resolver';
import { MealsController } from './meals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealsSchema } from 'src/models/meals.schema';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Meals", schema: MealsSchema }]),
    AwsModule
  ],
  providers: [MealsResolver, MealsService],
  exports: [MealsService],
  controllers: [MealsController]
})
export class MealsModule {}
