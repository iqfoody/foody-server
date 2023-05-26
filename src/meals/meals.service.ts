import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { MealsDocument } from 'src/models/meals.schema';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { LimitEntity } from 'src/constants/limitEntity';
import { CreateMealObject } from './dto/create-meal-object.input';
import { UpdateMealObject } from './dto/update-meal-object.input';
import { RemoveMealObject } from './dto/remove-mea-object.input';

@Injectable()
export class MealsService {
  constructor(
    @InjectModel("Meals") private MealsModel: Model<MealsDocument>,
    private readonly awsService: AwsService,
  ) {}

  //? application...

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
    if(!isValidObjectId(tag)) throw new BadRequestException("There isn't meals with this tag id");
    const meals = await this.MealsModel.find({$and: [{tag}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  async findForRestaurantCategory(restaurantCategory: string) {
    if(!isValidObjectId(restaurantCategory)) throw new BadRequestException("There isn't meals with this restaurant category id");
    const meals = await this.MealsModel.find({$and: [{restaurantCategory}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  async findMeal(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't meal with this id");
    const meal = await this.MealsModel.findOne({$and: [{_id: id}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
    if(meal?.image) meal.image = this.awsService.getUrl(meal.image);
    return meal;
  }

  async searchMeals(query: string){
    const meals = await this.MealsModel.find({$and: [{$text: {$search: query}}, {state: "Active"}]}, {score: {$meta: "textScore"}} ).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']).sort({score: {$meta: "textScore"}});
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  //? dashboard...

  async create(createMealInput: CreateMealInput) {
    const position = await this.MealsModel.countDocuments();
    return this.MealsModel.create({...createMealInput, position});
  }

  async createImage(id: string, image: string){
    await this.MealsModel.findByIdAndUpdate(id, {image});
    return this.awsService.getUrl(image);
  }

  async findAll(limitEntity: LimitEntity) {
    const startIndex = limitEntity.page * limitEntity.limit;
    const meals = await this.MealsModel.find().sort({_id: -1}).limit(limitEntity.limit).skip(startIndex);
    const total = await this.MealsModel.countDocuments();
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return {data: meals, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findOne(id: string) {
    const meal = await this.MealsModel.findById(id);
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

  async findExtention(_id: string, restaurant: string){
    if(!isValidObjectId(_id) || !isValidObjectId(restaurant)) throw new BadRequestException("There isn't meal or restaurant with this id")
    return this.MealsModel.findOne({$and: [{_id}, {restaurant}]}, {additions: 1, ingredients: 1, price: 1, points: 1, pointsBack: 1, _id: 0});
  }

  async search(query: string){
    const meals = await this.MealsModel.find({$text: {$search: query}}, {score: {$meta: "textScore"}} ).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']).sort({score: {$meta: "textScore"}});
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
  }

  async home() {
    return this.MealsModel.countDocuments();
  }

  //* additions & ingredients service...

  async createMealObject(createMealObject: CreateMealObject) {
    const meal :any = await this.MealsModel.findById(createMealObject.id);
    if(createMealObject?.price){
      meal.additions.push(createMealObject);
      await this.MealsModel.findByIdAndUpdate(createMealObject.id, {additions: meal.additions});
      return meal.additions[meal.additions.length -1];
    } else {
      meal.ingredients.push(createMealObject);
      await this.MealsModel.findByIdAndUpdate(createMealObject.id, {ingredients: meal.ingredients});
      return meal.ingredients[meal.ingredients.length -1];
    }
  }

  async updateMealObject(updateMealObject: UpdateMealObject) {
    const meal :any = await this.MealsModel.findById(updateMealObject.id);
    if(updateMealObject?.price){
      const additions = meal.additions.map((addition => addition._id == updateMealObject._id ? updateMealObject : addition));
      await this.MealsModel.findByIdAndUpdate(meal._id, {additions: additions});
      return "Success";
    } else {
      const ingredients = meal.ingredients.map((ingredient => ingredient._id == updateMealObject._id ? updateMealObject : ingredient));
      await this.MealsModel.findByIdAndUpdate(meal._id, {ingredients: ingredients});
      return "Success";
    }
  }

  async removeMealObject(removeMealObject: RemoveMealObject) {
    const meal :any = await this.MealsModel.findById(removeMealObject.id);
    if(removeMealObject?.addition){
      const additions = meal.additions.filter((addition => addition._id != removeMealObject.addition));
      await this.MealsModel.findByIdAndUpdate(meal._id, {additions: additions});
      return "Success";
    } else {
      const ingredients = meal.ingredients.filter((ingredient => ingredient._id != removeMealObject.ingredient));
      await this.MealsModel.findByIdAndUpdate(meal._id, {ingredients: ingredients});
      return "Success";
    }
  }

}
