import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { FavoritesDocument } from 'src/models/favorites.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel("Favorites") private FavoritesModel: Model<FavoritesDocument>,
    @Inject(forwardRef(()=> UsersService)) private usersService: UsersService,
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

  async findFavorite(phoneNumber: string) {
    const { _id } = await this.usersService.findId(phoneNumber);
    return this.FavoritesModel.findOne({user: _id}, {meals: 1, restaurants: 1, _id: 0}).populate([{path: "meals", select: {title: 1, titleEN: 1, titleKR: 1, image: 1 }}, {path: "restaurants", select: {title: 1, titleEN: 1, titleKR: 1, time: 1, image: 1, rate: 1, rating: 1 }}]);
  }

  async addFavorite(updateFavoriteInput: UpdateFavoriteInput, phoneNumber: string) {
    const { _id } = await this.usersService.findId(phoneNumber);
    const favorite = await this.FavoritesModel.findOne({user: _id});
    if(!favorite) throw new NotFoundException('favorites not found');
    // -> meal...
    if(updateFavoriteInput.type === "Meal"){
      // -> check meal in requested data...
      if(!updateFavoriteInput?.meal) throw new BadRequestException("meal required");
      if(!isValidObjectId(updateFavoriteInput.meal)) throw new BadRequestException("There isn't meal with this id");
      let meals: String[] = favorite?.meals as any;
      const index = favorite?.meals?.findIndex(id => id == _id);
      if(index === -1){ meals.push(updateFavoriteInput.meal) }
      else { meals = meals?.filter(id => id !== updateFavoriteInput.meal)}
      await this.FavoritesModel.findByIdAndUpdate(favorite._id, {meals});

      // -> restaurant...
    } else if (updateFavoriteInput.type === "Restaurant") {
      // -> check restaurant in requested data...
      if(!updateFavoriteInput?.restaurant) throw new BadRequestException("restaurant required");
      if(!isValidObjectId(updateFavoriteInput.restaurant)) throw new BadRequestException("There isn't restaurant with this id");
      let restaurants: String[] = favorite.restaurants as any;
      const index = favorite.restaurants.findIndex(id => id == _id);
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
