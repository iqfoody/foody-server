import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesDocument } from 'src/models/categories.schema';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("Categories") private CategoriesModel: Model<CategoriesDocument>,
    private readonly awsService: AwsService,
  ) {}

  async create(createCategoryInput: CreateCategoryInput, file: any) {
    if(!file) return new BadRequestException("image required");
    const position = await this.CategoriesModel.countDocuments();
    const category = new this.CategoriesModel({...createCategoryInput, position});
    const result = await this.awsService.createImage(file, category._id);
    category.image = result?.Key;
    await category.save();
    category.image = this.awsService.getUrl(result?.Key);
    return category;
  }

  async findAll() {
    const categories = await this.CategoriesModel.find();
    for(const single of categories){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return categories;
  }

  async findCategories() {
    const categories = await this.CategoriesModel.find({state: "Active"}, {title: 1, titleEN: 1, titleKR: 1, image: 1});
    for(const single of categories){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return categories;
  }

  async findOne(id: string) {
    const category = await this.CategoriesModel.findById(id);
    if(category?.image) category.image = this.awsService.getUrl(category.image);
    return category;
  }

  async findCategory(id: string) {
    const category = await this.CategoriesModel.findOne({$and: [{_id: id}, {state: "Active"}]}, {title: 1, titleEN: 1, titleKR: 1, image: 1});
    if(category?.image) category.image = this.awsService.getUrl(category.image);
    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    if(updateCategoryInput?.image){
      const {image} = await this.CategoriesModel.findOne({_id: updateCategoryInput.id}, {image: 1, _id: 0});
      this.awsService.removeImage(image);
    }
    await this.CategoriesModel.findByIdAndUpdate(id, updateCategoryInput);
    return "Success";
  }

  async state(stateInput: StateInput){
    await this.CategoriesModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  async position(updatePositionInput: UpdatePositionInput[]){
    for(const single of updatePositionInput){
      await this.CategoriesModel.findByIdAndUpdate(single.id, {position: single.position});
    }
    return "success";
  }

  async remove(id: string) {
    const {image} = await this.CategoriesModel.findOne({_id: id}, {image: 1, _id: 0});
    await this.CategoriesModel.findByIdAndDelete(id);
    this.awsService.removeImage(image);
    return "Success";
  }
}
