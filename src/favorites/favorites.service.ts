import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoritesDocument } from 'src/models/favorites.schema';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel("Favorites") private FavoritesModel: Model<FavoritesDocument>,
  ) {}

  create(createFavoriteInput: CreateFavoriteInput) {
    return this.FavoritesModel.create(createFavoriteInput);
  }

  findAll() {
    return this.FavoritesModel.find();
  }

  findOne(id: string) {
    return this.FavoritesModel.findById(id);
  }

  findFavorite(user: string) {
    return this.FavoritesModel.findOne({user}, {meals: 1, restaurants: 1, _id: 0}).populate([{path: "meals", select: {title: 1, titleEN: 1, titleKR: 1, image: 1 }}, {path: "restaurants", select: {title: 1, titleEN: 1, titleKR: 1, time: 1, image: 1, rate: 1, rating: 1 }}]);
  }

  async addFavorite(updateFavoriteInput: UpdateFavoriteInput, user: string) {
    const favorite = await this.FavoritesModel.findOne({user});
    if(!favorite) throw new NotFoundException('favorites not found');
    // -> meal...
    if(updateFavoriteInput.type === "Meal"){
      // -> check meal in requested data...
      if(!updateFavoriteInput?.meal) throw new BadRequestException("meal required");
      let meals: String[] = favorite?.meals as any;
      const index = favorite?.meals?.findIndex(id => id == user);
      if(index === -1){ meals.push(updateFavoriteInput.meal) }
      else { meals = meals?.filter(id => id !== updateFavoriteInput.meal)}
      await this.FavoritesModel.findByIdAndUpdate(favorite._id, {meals});

      // -> restaurant...
    } else if (updateFavoriteInput.type === "Restaurant") {
      // -> check restaurant in requested data...
      if(!updateFavoriteInput?.restaurant) throw new BadRequestException("restaurant required");
      let restaurants: String[] = favorite.restaurants as any;
      const index = favorite.restaurants.findIndex(id => id === user);
      if(index === -1){ restaurants.push(updateFavoriteInput.restaurant) }
      else { restaurants = restaurants.filter(id => id !== updateFavoriteInput.restaurant)}
      await this.FavoritesModel.findByIdAndUpdate(favorite._id, {restaurants});
    }
    return "Success";
  }

  async remove(id: string) {
    await this.FavoritesModel.findByIdAndDelete(id);
    return "Success";
  }

}
