import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackInput } from './dto/create-feedback.input';
export declare class FeedbacksController {
    private readonly feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    createFavorite(createFeedbackInput: CreateFeedbackInput): Promise<string>;
}
