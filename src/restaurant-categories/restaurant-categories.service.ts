import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateRestaurantCategoryInput } from './dto/create-restaurant-category.input';
import { UpdateRestaurantCategoryInput } from './dto/update-restaurant-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantCategoriesDocument } from 'src/models/restaurantCategories.schema';
import { UpdatePositionInput } from 'src/constants/position.input';
import { MealsService } from 'src/meals/meals.service';

@Injectable()
export class RestaurantCategoriesService {
  constructor(
    @InjectModel("RestaurantCategories") private RestaurantCategoriesModel: Model<RestaurantCategoriesDocument>,
    @Inject(forwardRef(()=> MealsService)) private mealsService: MealsService, 
  ) {}

  //? application...

  async findForRestaurant(restaurant: string) {
    let result = [];
    const categories = await this.RestaurantCategoriesModel.find({restaurant}).select(['-__v', '-position', '-restaurant']);
    for(const single of categories){
      const meals = await this.mealsService.findForRestaurantCategory(single._id);
      const { _doc: restCategory }: any = single;
      result.push({...restCategory, meals});
    }
    return result;
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
