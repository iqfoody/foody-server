import { Body, Controller, Post } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackInput } from './dto/create-feedback.input';

@Controller('feedbacks')
export class FeedbacksController {
    constructor(
        private readonly feedbacksService: FeedbacksService,
    ){}

    @Post('/')
    async createFavorite(@Body('createFeedbackInput') createFeedbackInput: CreateFeedbackInput) {
      return this.feedbacksService.create(createFeedbackInput);
    }
}
