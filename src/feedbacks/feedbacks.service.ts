import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbacksDocument } from 'src/models/feedbacks.schema';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel("Feedbacks") private FeedbacksModel: Model<FeedbacksDocument>,
  ) {}

  create(createFeedbackInput: CreateFeedbackInput) {
    return this.FeedbacksModel.create(createFeedbackInput);
  }

  findAll() {
    return this.FeedbacksModel.find();
  }

  findOne(id: string) {
    return this.FeedbacksModel.findById(id);
  }

  async remove(id: string) {
    await this.FeedbacksModel.findByIdAndDelete(id);
    return "Success";
  }
}
