import { CreateFeedbackInput } from './dto/create-feedback.input';
import { Model } from 'mongoose';
import { FeedbacksDocument } from 'src/models/feedbacks.schema';
import { LimitEntity } from 'src/constants/limitEntity';
import { AwsService } from 'src/aws/aws.service';
export declare class FeedbacksService {
    private FeedbacksModel;
    private readonly awsService;
    constructor(FeedbacksModel: Model<FeedbacksDocument>, awsService: AwsService);
    create(createFeedbackInput: CreateFeedbackInput): Promise<string>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<string>;
}
