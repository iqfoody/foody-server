import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { AwsService } from 'src/aws/aws.service';
import { TagsDocument } from 'src/models/tags.schema';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel("Tags") private TagsModel: Model<TagsDocument>,
    private readonly awsService: AwsService,
  ) {}

  //? application...

  async findTags() {
    const tags = await this.TagsModel.find({state: "Active"}, {title: 1, titleEN: 1, titleKR: 1});
    for(const single of tags){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return tags;
  }

  async findTag(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't tag with this id");
    const tag = await this.TagsModel.findOne({$and: [{_id: id}, {state: "Active"}]}, {title: 1, titleEN: 1, titleKR: 1});
    if(tag?.image) tag.image = this.awsService.getUrl(tag.image);
    return tag;
  }

  //? dashboard...

  async create(createTagInput: CreateTagInput, file: any) {
    const position = await this.TagsModel.countDocuments();
    const tag = new this.TagsModel({...createTagInput, position});
    if(file){
      const result = await this.awsService.createImage(file, tag._id);
      tag.image = result?.Key;
    }
    await tag.save();
    if(tag?.image) tag.image = this.awsService.getUrl(tag.image);
    return tag;
  }

  async findAll() {
    const tags = await this.TagsModel.find();
    for(const single of tags){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return tags;
  }

  async findOne(id: string) {
    const tag = await this.TagsModel.findById(id);
    if(tag?.image) tag.image = this.awsService.getUrl(tag.image);
    return tag;
  }

  async update(id: string, updateTagInput: UpdateTagInput) {
    if(updateTagInput?.image){
      const {image} = await this.TagsModel.findOne({_id: updateTagInput.id}, {image: 1, _id: 0});
      this.awsService.removeImage(image);
    }
    await this.TagsModel.findByIdAndUpdate(id, updateTagInput);
    return "Success";
  }

  async state(stateInput: StateInput){
    await this.TagsModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  async position(updatePositionInput: UpdatePositionInput[]){
    for(const single of updatePositionInput){
      await this.TagsModel.findByIdAndUpdate(single.id, {position: single.position});
    }
    return "success";
  }

  async remove(id: string) {
    const {image} = await this.TagsModel.findOne({_id: id}, {image: 1, _id: 0});
    await this.TagsModel.findByIdAndDelete(id);
    if(image) this.awsService.removeImage(image);
    return "Success";
  }
}
