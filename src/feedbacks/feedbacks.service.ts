import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbacksDocument } from 'src/models/feedbacks.schema';
import { LimitEntity } from 'src/constants/limitEntity';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel("Feedbacks") private FeedbacksModel: Model<FeedbacksDocument>,
    private readonly awsService: AwsService,
  ) {}

  //? application...
  async create(createFeedbackInput: CreateFeedbackInput) {
    await this.FeedbacksModel.create(createFeedbackInput);
    return "Success";
  }

  //? dashboard...

  async findAll(limitEntity: LimitEntity) {
    const startIndex = limitEntity.page * limitEntity.limit;
    const feedbacks: any = await this.FeedbacksModel.find().limit(limitEntity.limit).skip(startIndex).sort({_id: -1}).populate({path: "user", select: {name: 1, phoneNumber: 1, image: 1}});
    const total = await this.FeedbacksModel.countDocuments();
    for(const single of feedbacks){
      if(single?.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: feedbacks, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findOne(id: string) {
    const feedback: any = await this.FeedbacksModel.findById(id).populate({path: "user", select: {name: 1, phoneNumber: 1, image: 1}});
    if(feedback?.user?.image) feedback.user.image = this.awsService.getUrl(feedback.user.image);
    return feedback;
  }

  async remove(id: string) {
    await this.FeedbacksModel.findByIdAndDelete(id);
    return "Success";
  }
}
