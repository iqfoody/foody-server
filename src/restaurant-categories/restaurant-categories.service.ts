import { Injectable } from '@nestjs/common';
import { CreateRestaurantCategoryInput } from './dto/create-restaurant-category.input';
import { UpdateRestaurantCategoryInput } from './dto/update-restaurant-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantCategoriesDocument } from 'src/models/restaurantCategories.schema';
import { UpdatePositionInput } from 'src/constants/position.input';

@Injectable()
export class RestaurantCategoriesService {
  constructor(
    @InjectModel("RestaurantCategories") private RestaurantCategoriesModel: Model<RestaurantCategoriesDocument>,
  ) {}

  //? application...

  findForRestaurant(restaurant: string) {
    return this.RestaurantCategoriesModel.find({restaurant}).select(['-__v', '-position', '-restaurant']);
  }

  //? dashbaord...

  create(createRestaurantCategoryInput: CreateRestaurantCategoryInput) {
    return this.RestaurantCategoriesModel.create(createRestaurantCategoryInput);
  }

  findAll(restaurant: string) {
    return this.RestaurantCategoriesModel.find({restaurant});
  }

  findOne(id: string) {
    return this.RestaurantCategoriesModel.findById(id);
  }

  async update(id: string, updateRestaurantCategoryInput: UpdateRestaurantCategoryInput) {
    await this.RestaurantCategoriesModel.findByIdAndUpdate(id, updateRestaurantCategoryInput);
    return "Success";
  }

  async position(updatePositionInput: UpdatePositionInput[]){
    for(const single of updatePositionInput){
      await this.RestaurantCategoriesModel.findByIdAndUpdate(single.id, {position: single.position});
    }
    return "success";
  }

  async remove(id: string) {
    await this.RestaurantCategoriesModel.findByIdAndDelete(id)
    return "Success";
  }

  async clean(id: string) {
    await this.RestaurantCategoriesModel.deleteMany({restaurant: id})
    return "Success";
  }
}
