import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbacksDocument } from 'src/models/feedbacks.schema';
import { LimitEntity } from 'src/constants/limitEntity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel("Feedbacks") private FeedbacksModel: Model<FeedbacksDocument>,
  ) {}

  //? application...
  async create(createFeedbackInput: CreateFeedbackInput) {
    await this.FeedbacksModel.create(createFeedbackInput);
    return "Success";
  }

  //? dashboard...

  async findAll(limitEntity: LimitEntity) {
    const startIndex = limitEntity.page * limitEntity.limit;
    const feedbacks = await this.FeedbacksModel.find().limit(limitEntity.limit).skip(startIndex).sort({_id: -1});
    const total = await this.FeedbacksModel.countDocuments();
    return {data: feedbacks, pages: Math.ceil(total / limitEntity.limit)};
  }

  findOne(id: string) {
    return this.FeedbacksModel.findById(id);
  }

  async remove(id: string) {
    await this.FeedbacksModel.findByIdAndDelete(id);
    return "Success";
  }
}
