import { Injectable } from '@nestjs/common';
import { CreateRestaurantCategoryInput } from './dto/create-restaurant-category.input';
import { UpdateRestaurantCategoryInput } from './dto/update-restaurant-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantCategoriesDocument } from 'src/models/restaurantCategories.schema';

@Injectable()
export class RestaurantCategoriesService {
  constructor(
    @InjectModel("RestaurantCategories") private RestaurantCategoriesModel: Model<RestaurantCategoriesDocument>,
  ) {}

  create(createRestaurantCategoryInput: CreateRestaurantCategoryInput) {
    return this.RestaurantCategoriesModel.create(createRestaurantCategoryInput);
  }

  findAll() {
    return this.RestaurantCategoriesModel.find();
  }

  findForRestaurant(restaurant: string) {
    return this.RestaurantCategoriesModel.find({restaurant}).select(['-__v', '-position', '-restaurant']);
  }

  findOne(id: string) {
    return this.RestaurantCategoriesModel.findById(id);
  }

  async update(id: string, updateRestaurantCategoryInput: UpdateRestaurantCategoryInput) {
    await this.RestaurantCategoriesModel.findByIdAndUpdate(id, updateRestaurantCategoryInput);
    return "Success";
  }

  async remove(id: string) {
    await this.RestaurantCategoriesModel.findByIdAndDelete(id)
    return "Success";
  }
}
