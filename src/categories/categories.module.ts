import { Module, forwardRef } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema } from 'src/models/categories.schema';
import { AwsModule } from 'src/aws/aws.module';
import { MealsModule } from 'src/meals/meals.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Categories", schema: CategoriesSchema }]),
    forwardRef(()=> MealsModule),
    AwsModule,
  ],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
