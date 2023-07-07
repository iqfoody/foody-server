import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
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

  //? application...

  async findCategories() {
    const categories = await this.CategoriesModel.find({state: "Active"}, {title: 1, titleEN: 1, titleKR: 1, image: 1});
    for(const single of categories){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return categories;
  }

  async findCategory(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't category with this id");
    const category = await this.CategoriesModel.findOne({$and: [{_id: id}, {state: "Active"}]}, {title: 1, titleEN: 1, titleKR: 1, image: 1});
    if(category?.image) category.image = this.awsService.getUrl(category.image);
    return category;
  }

  //? dashboard...

  async create(createCategoryInput: CreateCategoryInput) {
    if(!createCategoryInput.image) return new BadRequestException("image required");
    const position = await this.CategoriesModel.countDocuments();
    const category = new this.CategoriesModel({...createCategoryInput, position});
    const result = await this.awsService.createImage(createCategoryInput.image, category._id);
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

  async findOne(id: string) {
    const category = await this.CategoriesModel.findById(id);
    if(category?.image) category.image = this.awsService.getUrl(category.image);
    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    if(updateCategoryInput?.image){
      const {image} = await this.CategoriesModel.findOne({_id: updateCategoryInput.id}, {image: 1, _id: 0});
      this.awsService.removeImage(image);
      const result = await this.awsService.createImage(updateCategoryInput.image, id);
      await this.CategoriesModel.findByIdAndUpdate(id, {...updateCategoryInput, image: result?.Key});
    } else {
      await this.CategoriesModel.findByIdAndUpdate(id, updateCategoryInput);
    }
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
    const result = await this.CategoriesModel.findOne({_id: id}, {image: 1, _id: 0});
    try {
      if(result?.image) await this.awsService.removeImage(result.image);
      //TODO: delete all category field from meals...
      await this.CategoriesModel.findByIdAndDelete(id);
      return "Success";
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
