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

  //TODO: populate -> user & target...

  //? application...

  async findAdvertisements() {
    //TODO: if advert for user -> return advert for them...
    const advertisements = await this.AdvertisementsModel.find({state: "Active"}, {title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1, target: 1, _id: 0});
    for(const single of advertisements){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return advertisements;
  }

  // -> this just in case activate _id in -> findAdvertisements...
  async findAdvertisement(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't advertisement with this id")
    const advertisement = await this.AdvertisementsModel.findOne({$and: [{_id: id}, {state: "Active"}]}, {title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1, target: 1, _id: 0});
    if(advertisement?.image) advertisement.image = this.awsService.getUrl(advertisement.image);
    return advertisement;
  }

  //? dashborad...

  async create(createAdvertisementInput: CreateAdvertisementInput, file: any) {
    if(!file) return new BadRequestException("image required");
    const position = await this.AdvertisementsModel.countDocuments();
    const advertisement = new this.AdvertisementsModel({...createAdvertisementInput, position});
    const result = await this.awsService.createImage(file, advertisement._id);
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
    const advertisement = await this.AdvertisementsModel.findById(id);
    if(advertisement?.image) advertisement.image = this.awsService.getUrl(advertisement.image);
    return advertisement;
  }

  async update(id: string, updateAdvertisementInput: UpdateAdvertisementInput) {
    if(updateAdvertisementInput?.image){
      const {image} = await this.AdvertisementsModel.findOne({_id: updateAdvertisementInput.id}, {image: 1, _id: 0});
      this.awsService.removeImage(image);
    }
    await this.AdvertisementsModel.findByIdAndUpdate(id, updateAdvertisementInput);
    return "Success";
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
    const {image} = await this.AdvertisementsModel.findOne({_id: id}, {image: 1, _id: 0});
    await this.AdvertisementsModel.findByIdAndDelete(id);
    this.awsService.removeImage(image);
    return "Success";
  }
}
