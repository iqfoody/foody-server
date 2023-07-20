import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdvertisementInput } from './dto/create-advertisement.input';
import { UpdateAdvertisementInput } from './dto/update-advertisement.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { AdvertisementsDocument } from 'src/models/advertisements.schema';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectModel("Advertisements") private AdvertisementsModel: Model<AdvertisementsDocument>,
    private readonly awsService: AwsService,
  ) {}

  //? application...

  async findAdvertisements() {
    //TODO: if advert for user -> return advert for them...
    const advertisements = await this.AdvertisementsModel.find({state: "Active"}, {title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1, restaurant: 1, meal: 1});
    for(const single of advertisements){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return advertisements;
  }

  // -> this just in case activate _id in -> findAdvertisements...
  async findAdvertisement(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't advertisement with this id")
    const advertisement = await this.AdvertisementsModel.findOne({$and: [{_id: id}, {state: "Active"}]}, {title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1});
    if(advertisement?.image) advertisement.image = this.awsService.getUrl(advertisement.image);
    return advertisement;
  }

  //? dashborad...

  async create(createAdvertisementInput: CreateAdvertisementInput) {
    if(!createAdvertisementInput?.image) return new BadRequestException("image required");
    const position = await this.AdvertisementsModel.countDocuments();
    const advertisement = new this.AdvertisementsModel({...createAdvertisementInput, position});
    const result = await this.awsService.createImage(createAdvertisementInput.image, advertisement._id);
    advertisement.image = result?.Key;
    await advertisement.save();
    advertisement.image = this.awsService.getUrl(result?.Key);
    return advertisement;
  }

  async findAll() {
    const advertisements = await this.AdvertisementsModel.find();
    for(const single of advertisements){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return advertisements;
  }

  async findOne(id: string) {
    const advertisement: any = await this.AdvertisementsModel.findById(id).populate(["restaurant", "meal", "user"]);
    if(advertisement?.image) advertisement.image = this.awsService.getUrl(advertisement.image);
    if(advertisement?.restaurant?.image) advertisement.restaurant.image = this.awsService.getUrl(advertisement.restaurant.image);
    if(advertisement?.meal?.image) advertisement.meal.image = this.awsService.getUrl(advertisement.meal.image);
    if(advertisement?.user?.image) advertisement.user.image = this.awsService.getUrl(advertisement.user.image);
    return advertisement;
  }

  async update(id: string, updateAdvertisementInput: UpdateAdvertisementInput) {
    let updatedAdvertisement;
    if(updateAdvertisementInput?.image){
      const {image} = await this.AdvertisementsModel.findOne({_id: updateAdvertisementInput.id}, {image: 1, _id: 0});
      this.awsService.removeImage(image);
      const result = await this.awsService.createImage(updateAdvertisementInput.image, id);
      updatedAdvertisement = await this.AdvertisementsModel.findByIdAndUpdate(id, {...updateAdvertisementInput, image: result?.Key}, {new: true}).populate(["restaurant", "meal", "user"]);
    } else {
      updatedAdvertisement = await this.AdvertisementsModel.findByIdAndUpdate(id, updateAdvertisementInput, {new: true}).populate(["restaurant", "meal", "user"]);;
    }
    if(updatedAdvertisement?.image) updatedAdvertisement.image = this.awsService.getUrl(updatedAdvertisement.image);
    if(updatedAdvertisement?.restaurant?.image) updatedAdvertisement.restaurant.image = this.awsService.getUrl(updatedAdvertisement.restaurant.image);
    if(updatedAdvertisement?.meal?.image) updatedAdvertisement.meal.image = this.awsService.getUrl(updatedAdvertisement.meal.image);
    if(updatedAdvertisement?.user?.image) updatedAdvertisement.user.image = this.awsService.getUrl(updatedAdvertisement.user.image);
    return updatedAdvertisement;
  }

  async state(stateInput: StateInput){
    await this.AdvertisementsModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  async position(updatePositionInput: UpdatePositionInput[]){
    for(const single of updatePositionInput){
      await this.AdvertisementsModel.findByIdAndUpdate(single.id, {position: single.position});
    }
    return "success";
  }

  async remove(id: string) {
    const result = await this.AdvertisementsModel.findOne({_id: id}, {image: 1, _id: 0});
    try {
      if(result?.image) await this.awsService.removeImage(result.image);
      await this.AdvertisementsModel.findByIdAndDelete(id);
      return "Success";
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
