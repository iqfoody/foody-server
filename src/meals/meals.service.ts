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
    const meals = await this.MealsModel.find({$and: [{restaurant}, {state: "Active"}]}).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag']);
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
      if(single?.points) single.points = single.points * single.price;
      if(single?.pointsBack) single.pointsBack = (single.pointsBack / 100) * single.price;
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

  async findForCategory(category: string, orderBy?: string) {
    if(!isValidObjectId(category)) throw new BadRequestException("There isn't meals with this category id");
    let sort :any = {position: 1};
    if(orderBy === 'highestPrice') { sort = { price: -1}}
    else if (orderBy === 'lowestPrice') { sort = { price: 1}}
    else if (orderBy === 'recently') { sort = { _id: -1}}
    const meals = await this.MealsModel.find({$and: [{category}, {state: "Active"}]}).select(['-position','-state', '-__v', '-createdAt', '-updatedAt']).sort(sort);
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return meals;
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
      if(single?.points) single.points = single.points * single.price;
      if(single?.pointsBack) single.pointsBack = (single.pointsBack / 100) * single.price;
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
    const search = new RegExp(query, 'i');
    const meals = await this.MealsModel.find({$and: [{$or: [{title: search}, {titleEN: search}, {description: search}, {descriptionEN: search}]}, {state: "Active"}]}).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']);
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
    const meals = await this.MealsModel.find().sort({position: 1}).limit(limitEntity.limit).skip(startIndex).populate("category");
    const total = await this.MealsModel.countDocuments();
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return {data: meals, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findAllForRestaurant(limitEntity: LimitEntity) {
    const startIndex = limitEntity.page * limitEntity.limit;
    const meals = await this.MealsModel.find({$and: [{restaurant: limitEntity.user}, {state: "Active"}]}).sort({_id: -1}).limit(limitEntity.limit).skip(startIndex);
    const total = await this.MealsModel.countDocuments({$and: [{restaurant: limitEntity.user}, {state: "Active"}]});
    for(const single of meals){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return {data: meals, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findOne(id: string) {
    const meal = await this.MealsModel.findById(id).populate({path: "category", select: {_id: 1}});
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
    if(image) this.awsService.removeImage(image);
    return "Success";
  }

  async findExtention(_id: string, restaurant: string){
    if(!isValidObjectId(_id) || !isValidObjectId(restaurant)) throw new BadRequestException("There isn't meal or restaurant with this id")
    return this.MealsModel.findOne({$and: [{_id}, {restaurant}]}, {additions: 1, ingredients: 1, price: 1, points: 1, pointsBack: 1, discount: 1, _id: 0});
  }

  async search(query: string){
    const search = new RegExp(query, 'i');
    const meals = await this.MealsModel.find({$and: [{$or: [{title: search}, {titleEN: search}, {description: search}, {descriptionEN: search}]}, {state: "Active"}]}).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']);
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
