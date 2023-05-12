import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsSchema } from 'src/models/tags.schema';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Tags", schema: TagsSchema }]),
    AwsModule,
  ],
  providers: [TagsResolver, TagsService],
  exports: [TagsService],
  controllers: [TagsController]
})
export class TagsModule {}
