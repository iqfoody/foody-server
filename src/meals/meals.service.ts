import { Injectable } from '@nestjs/common';
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MealsDocument } from 'src/models/meals.schema';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { LimitEntity } from 'src/constants/limitEntity';

@Injectable()
export class MealsService {
  constructor(
    @InjectModel("Meals") private MealsModel: Model<MealsDocument>,
    private readonly awsService: AwsService,
  ) {}

  async create(createMealInput: CreateMealInput, file: any) {
    const position = await this.MealsModel.countDocuments();
    const meal = new this.MealsModel({...createMealInput, position});
    const result = await this.awsService.createImage(file, meal._id);
    meal.image = result?.Key;
    await meal.save();
    meal.image = this.awsService.getUrl(result?.Key);
    return meal;
  }

  async findAll() {
    const meals = await this.MealsModel.find();
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  async findForRestaurant(restaurant: string) {
    const meals = await this.MealsModel.find({$and: [{restaurant}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  async findMealsInfinty(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.limit;
    const total = await this.MealsModel.countDocuments({state: "Active"});
    const meals = await this.MealsModel.find({state: "Active"}).select(['-position','-state', '-__v', '-createdAt', '-updatedAt']).limit(limitEntity.limit).skip(skipIndex).sort({position: 1});
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return {data: meals, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findForTag(tag: string) {
    const meals = await this.MealsModel.find({$and: [{tag}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  async findForRestaurantCategory(restaurantCategories: string) {
    const meals = await this.MealsModel.find({$and: [{restaurantCategories}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  async findOne(id: string) {
    const meal = await this.MealsModel.findById(id);
    if(meal?.image) meal.image = this.awsService.getUrl(meal.image);
    return meal;
  }

  async findMeal(id: string) {
    const meal = await this.MealsModel.findOne({$and: [{_id: id}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
    if(meal?.image) meal.image = this.awsService.getUrl(meal.image);
    return meal;
  }

  async update(id: string, updateMealInput: UpdateMealInput) {
    if(updateMealInput?.image){
      const {image} = await this.MealsModel.findOne({_id: updateMealInput.id}, {image: 1, _id: 0});
      this.awsService.removeImage(image);
    }
    await this.MealsModel.findByIdAndUpdate(id, updateMealInput);
    return "Success";
  }

  async state(stateInput: StateInput){
    await this.MealsModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  async position(updatePositionInput: UpdatePositionInput[]){
    for(const single of updatePositionInput){
      await this.MealsModel.findByIdAndUpdate(single.id, {position: single.position});
    }
    return "success";
  }

  async remove(id: string) {
    const {image} = await this.MealsModel.findOne({_id: id}, {image: 1, _id: 0});
    await this.MealsModel.findByIdAndDelete(id);
    this.awsService.removeImage(image);
    return "Success";
  }

  async findExtention(_id: string){
    return this.MealsModel.findOne({_id}, {additions: 1, ingredients: 1, price: 1, points: 1, _id: 0});
  }

  async search(query: string){
    return this.MealsModel.find({$and: [{$text: {$search: query}}, {state: "Active"}]}, {score: {$meta: "textScore"}} ).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']).sort({score: {$meta: "textScore"}});
  }

}
