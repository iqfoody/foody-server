import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { InjectModel } from '@nestjs/mongoose';
import { IDriversModel } from 'src/models/drivers.schema';
import { AwsService } from 'src/aws/aws.service';
import { LoginInput } from 'src/auth/dto/login.input';
import { StateInput } from 'src/constants/state.input';
import { genSalt, hash } from 'bcryptjs';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel("Drivers") private DriversModel: IDriversModel,
    @Inject(forwardRef(() => WalletsService)) private walletsService: WalletsService,
    private readonly awsService: AwsService,
  ) {}

  //? application...

  async login(loginInput: LoginInput) {
    const driver = await this.DriversModel.login(loginInput);
    if(driver?.image) driver.image = this.awsService.getUrl(driver?.image);
    return driver;
  }

  async info(id: string) {
    const driver = await this.DriversModel.findById(id);
    if(driver?.image) driver.image = this.awsService.getUrl(driver?.image);
    return driver;
  }

  async logout(id: string){
    await this.DriversModel.findByIdAndUpdate(id, {refreshToken: null})
  }

  async refresh(id: string, token: string){
    const driver = await this.DriversModel.findById(id);
    if(!driver) throw new NotFoundException('Access Denied');
    const isMatched = driver.compareToken(token);
    if (!isMatched) throw new ForbiddenException('Access Denied');
    return driver;
  }

  //? dashboard...

  async create(createDriverInput: CreateDriverInput) {
    let E0011 = await this.findByPhoneNumber(createDriverInput.phoneNumber);
    if(E0011) throw new Error('phoneNumber E0011')
    const driver = new this.DriversModel(createDriverInput);
    if(createDriverInput?.image){
      const result = await this.awsService.createImage(createDriverInput.image, driver._id);
      driver.image = result?.Key;
    }
    // create wallet...
    const wallet = await this.walletsService.create({driver: driver._id});
    driver.wallet = wallet._id;
    await driver.save();
    if(driver?.image) driver.image = this.awsService.getUrl(driver.image);
    return driver;
  }

  async findAll() {
    const drivers = await this.DriversModel.find().populate("wallet");
    for(const driver of drivers){
      if(driver?.image) driver.image = this.awsService.getUrl(driver?.image);
    }
    return drivers;
  }

  async findOne(id: string) {
    const driver = await this.DriversModel.findById(id).populate("wallet");
    if(driver?.image) driver.image = this.awsService.getUrl(driver?.image);
    return driver;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const driver = await this.DriversModel.findOne({phoneNumber});
    if(driver?.image) driver.image = this.awsService.getUrl(driver?.image);
    return driver;
  }

  async updateAny(id: string, updateAdminInput: UpdateDriverInput) {
    await this.DriversModel.findByIdAndUpdate(id, updateAdminInput);
    return;
  }

  async update(id: string, updateDriverInput: UpdateDriverInput) {
    let E0011 = await this.findByPhoneNumber(updateDriverInput.phoneNumber);
    if(E0011 && id != E0011._id) throw new Error('phoneNumber E0011')
    if(updateDriverInput?.image){
      const { image } = await this.DriversModel.findOne({_id: updateDriverInput.id}, {image: 1, _id: 0});
      if(image) this.awsService.removeImage(image);
      const result = await this.awsService.createImage(updateDriverInput.image, id);
      await this.DriversModel.findByIdAndUpdate(id, {...updateDriverInput, image: result?.Key});
    } else {
      await this.DriversModel.findByIdAndUpdate(id, updateDriverInput);
    }
    return "account updated";
  }

  async password(id: string, updatePasswordDriver: UpdatePasswordUser) {
    const salt = await genSalt();
    const hashed = await hash(updatePasswordDriver.password, salt)
    await this.DriversModel.findByIdAndUpdate(id, {password: hashed, refreshToken: null});
    return "Success";
  }

  async state(stateInput: StateInput) {
    await this.DriversModel.findOneAndUpdate({$and: [{_id: stateInput.id}, {type: {$ne: "Admin"}}]}, stateInput);
    return "success";
  }

  async remove(_id: string) {
    const result = await this.DriversModel.findOne({_id}, {image: 1, _id: 0});
    try { 
      if(result?.image) await this.awsService.removeImage(result.image);
      await this.walletsService.removeDriver(_id);
      await this.DriversModel.findByIdAndDelete(_id);
      return "success";
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findId(phoneNumber: string) {
    const driver = await this.DriversModel.findOne({phoneNumber}, {_id: 1, deviceToken: 1});
    if(!driver) throw new BadRequestException("There isn't driver regestered with this phone number");
    return driver;
  }

  async findDeviceToken(_id: string){
    return this.DriversModel.findOne({_id}, {deviceToken: 1, _id: 0})
  }

  async home() {
    return this.DriversModel.countDocuments();
  }
}
