import { FeedbacksService } from './feedbacks.service';
import { LimitEntity } from 'src/constants/limitEntity';
export declare class FeedbacksResolver {
    private readonly feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findOne(id: string): Promise<any>;
    removeFeedback(id: string): Promise<string>;
}
