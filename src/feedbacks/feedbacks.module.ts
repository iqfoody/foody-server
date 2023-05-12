import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksResolver } from './feedbacks.resolver';
import { FeedbacksController } from './feedbacks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbacksSchema } from 'src/models/feedbacks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Feedbacks", schema: FeedbacksSchema }]),
  ],
  providers: [FeedbacksResolver, FeedbacksService],
  exports: [FeedbacksService],
  controllers: [FeedbacksController]
})
export class FeedbacksModule {}
