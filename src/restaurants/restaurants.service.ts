import { Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantsDocument } from 'src/models/restaurants.schema';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { LimitEntity } from 'src/constants/limitEntity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel("Restaurants") private RestaurantsModel: Model<RestaurantsDocument>,
    private readonly awsService: AwsService,
  ) {}

  //TODO: populate -> restaurants & tag & restaurantCategories...

  async create(createRestaurantInput: CreateRestaurantInput, file: any) {
    const position = await this.RestaurantsModel.countDocuments();
    const restaurant = new this.RestaurantsModel({...createRestaurantInput, position});
    const result = await this.awsService.createImage(file, restaurant._id);
    restaurant.image = result?.Key;
    await restaurant.save();
    restaurant.image = this.awsService.getUrl(result?.Key);
    return restaurant;
  }

  async findAll() {
    const restaurants = await this.RestaurantsModel.find();
    for(const single of restaurants){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return restaurants;
  }

  async findRestaurnats() {
    const restaurants = await this.RestaurantsModel.find({state: "Active"}).select(['-position','-state', '-__v', '-createdAt', '-updatedAt']).populate({path: "category", select: {title: 1, titleEN: 1, titleKR: 1, _id: 0}});
    for(const single of restaurants){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return restaurants;
  }

  async findRestaurnatsInfinty(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.limit;
    const total = await this.RestaurantsModel.countDocuments({state: "Active"});
    const restaurants = await this.RestaurantsModel.find({state: "Active"}).select(['-position','-state', '-__v', '-createdAt', '-updatedAt']).limit(limitEntity.limit).skip(skipIndex).sort({position: -1}).populate({path: "category", select: {title: 1, titleEN: 1, titleKR: 1, _id: 0}});
    for(const single of restaurants){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return {data: restaurants, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findForCategory(category: string, orderBy?: string) {
    let sort :any = {position: 1};
    if(orderBy === 'highestPrice') { sort = { price: -1}}
    else if (orderBy === 'lowestPrice') { sort = { price: 1}}
    else if (orderBy === 'recently') { sort = { _id: -1}}
    const restaurants = await this.RestaurantsModel.find({$and: [{category}, {state: "Active"}]}).select(['-position','-state', '-__v', '-createdAt', '-updatedAt', '-category']).sort(sort);
    for(const single of restaurants){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return restaurants;
  }

  async findOne(id: string) {
    const restaurant = await this.RestaurantsModel.findById(id);
    if(restaurant?.image) restaurant.image = this.awsService.getUrl(restaurant.image);
    return restaurant;
  }

  async findRestaurant(id: string) {
    const restaurant = await this.RestaurantsModel.findOne({$and: [{_id: id}, {state: "Active"}]}).select(['-position','-state', '-__v', '-createdAt', '-updatedAt', '-category']);
    if(restaurant?.image) restaurant.image = this.awsService.getUrl(restaurant.image);
    return restaurant;
  }

  async update(id: string, updateRestaurantInput: UpdateRestaurantInput) {
    if(updateRestaurantInput?.image){
      const {image} = await this.RestaurantsModel.findOne({_id: updateRestaurantInput.id}, {image: 1, _id: 0});
      this.awsService.removeImage(image);
    }
    await this.RestaurantsModel.findByIdAndUpdate(id, updateRestaurantInput);
    return "Success";
  }

  async state(stateInput: StateInput){
    await this.RestaurantsModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  async position(updatePositionInput: UpdatePositionInput[]){
    for(const single of updatePositionInput){
      await this.RestaurantsModel.findByIdAndUpdate(single.id, {position: single.position});
    }
    return "success";
  }

  async remove(id: string) {
    const {image} = await this.RestaurantsModel.findOne({_id: id}, {image: 1, _id: 0});
    await this.RestaurantsModel.findByIdAndDelete(id);
    this.awsService.removeImage(image);
    return "Success";
  }

  async search(query: string){
    return this.RestaurantsModel.find({$and: [ {$text: {$search: query}}, {state: "Active"} ]}, {score: {$meta: "textScore"}}).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position']).sort({score: {$meta: "textScore"}});
  }

  getDeliveryPrice(_id: string){
    return this.RestaurantsModel.findOne({$and: [{_id}, {state: "Active"}]}, {deliveryPrice: 1, _id: 0})
  }

  findRating(_id: string){
    return this.RestaurantsModel.findOne({$and: [{_id}, {state: "Active"}]}, {rates: 1, rating: 1, _id: 0})
  }

}
