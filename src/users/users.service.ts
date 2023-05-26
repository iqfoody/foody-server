import { BadRequestException, ForbiddenException, Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsersModel } from 'src/models/users.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { genSalt, hash } from 'bcryptjs'
import { User } from './entities/user.entity';
import { PasswordUserInput } from './dto/password-user.input';
import { Response } from 'src/constants/response.entity';
import { SearchUsersInput } from './dto/search-users.input';
import { userTypes } from 'src/constants/types.type';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdateUserInfo } from './dto/update-info.input';
import { FavoritesService } from 'src/favorites/favorites.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { LimitEntity } from 'src/constants/limitEntity';
import { UpdatePasswordUser } from './dto/update-password-user.input';
import { SearchInput } from 'src/constants/searchQuery.input';
import { AddressesService } from 'src/addresses/addresses.service';
import { months } from 'src/constants/declearedMonths';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("Users") private UsersModel: IUsersModel,
    private readonly awsService: AwsService,
    private readonly favoritesService: FavoritesService,
    private readonly walletsService: WalletsService,
    private readonly addressesService: AddressesService,
  ) {}

  //? -> dashboard...

  async search(searchUsersInput: SearchInput){
    const LIMIT = 8;
    const startIndex = (searchUsersInput.page) * LIMIT;
    const search = new RegExp(searchUsersInput.query, 'i');
    const users = await this.UsersModel.find({ $or: [ { email: search }, { name: search }, {phoneNumber: search} ] }).limit(LIMIT).skip(startIndex);
    const total = await this.UsersModel.countDocuments();
    for(const user of users){
      if(user?.image) user.image = this.awsService.getUrl(user?.image);
    }
    return {data: users, pages: Math.ceil(total / LIMIT)};
  }

  async findAllUsers(limitEntity: LimitEntity) {
    const startIndex = limitEntity.page * limitEntity.limit;
    const users = await this.UsersModel.find().limit(limitEntity.limit).skip(startIndex).sort({_id: -1});
    const total = await this.UsersModel.countDocuments();
    for(const user of users){
      if(user?.image) user.image = this.awsService.getUrl(user?.image);
    }
    return {data: users, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findAll() {
    const users = await this.UsersModel.find().exec();
    for(const user of users){
      if(user?.image) user.image = this.awsService.getUrl(user?.image);
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.UsersModel.findById(id).populate("wallet");
    if(user?.image) user.image = this.awsService.getUrl(user?.image);
    return user;
  }

  async createUser(createUserInput: CreateUserInput, file: any){
    // -> check password length...
    if(createUserInput?.password?.length < 6) throw new BadRequestException("password E0004");
    // -> check existing phone number...
    const phoneNumber = await this.findByPhoneNumber(createUserInput.phoneNumber);
    if(phoneNumber){
      throw new NotAcceptableException("phoneNumber E0011");
    // -> check existing email...
    } else if(createUserInput?.email) {
      const email = await this.findByEmail(createUserInput.email);
      if(email) throw new NotAcceptableException("email E0011")
    }
    // -> create wallet...
    const wallet = await this.walletsService.create();
    const user = new this.UsersModel({...createUserInput, wallet: wallet._id});
    // -> upload image to s3 bucket...
    if(file) {
      const result = await this.awsService.createImage(file, user._id);
      user.image = result?.Key;
    }
    await user.save();
    // -> create favorites model...
    await this.favoritesService.create({user: user._id});
    // -> get image url...
    if(user?.image) user.image = this.awsService.getUrl(user.image);
    const { _id, name, phoneNumber: phone, image, type, state, createdAt} :any= user
    return {_id, name, phoneNumber: phone, image, type, state, createdAt, email: null};
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    if(updateUserInput?.phoneNumber){
      let E0011 = await this.findByPhoneNumber(updateUserInput.phoneNumber);
      if(E0011 && id != E0011._id) throw new BadRequestException('phoneNumber E0011');
    }
    if (updateUserInput?.email) {
      let E0002 = await this.findByEmail(updateUserInput.email);
      if(E0002 && id != E0002._id) throw new BadRequestException('email E0002')
    }
    if(updateUserInput?.image){
      const { image } = await this.UsersModel.findOne({_id: id}, {image: 1, _id: 0});
      if( image ) this.awsService.removeImage(image);
    }
    await this.UsersModel.findByIdAndUpdate(id, updateUserInput);
    return "Success";
  }

  async passwordUser(id: string, updatePasswordUser: UpdatePasswordUser) {
    const salt = await genSalt();
    const hashed = await hash(updatePasswordUser.password, salt)
    await this.UsersModel.findByIdAndUpdate(id, {password: hashed, refreshToken: null});
    return "Success";
  }

  async state(stateInput: StateInput) {
    await this.UsersModel.findByIdAndUpdate(stateInput.id, stateInput).exec();
    return "Success"
  }

  async remove(id: string) {
    const result = await this.UsersModel.findOne({_id: id}, {image: 1, _id: 0});
    await this.UsersModel.findByIdAndDelete(id);
    await this.favoritesService.remove(id);
    await this.walletsService.remove(id);
    await this.addressesService.clean(id);
    if(result?.image) this.awsService.removeImage(result?.image);
    return "user has been deleted";
  }

  //? -> application...

  async login(loginUserInput: any) {
    const user = await this.UsersModel.login(loginUserInput);
    if(user?.image) user.image = this.awsService.getUrl(user?.image);
    return user;
  }

  async create(createUserInput: CreateUserInput){
    const wallet = await this.walletsService.create();
    const user = new this.UsersModel({...createUserInput, wallet: wallet._id});
    await user.save();
    await this.favoritesService.create({user: user._id});
    return user.populate({path: "wallet", select: {points: 1, amount: 1, _id: 0}});
  }

  async findByType(_id: string, type: userTypes) {
    const user = await this.UsersModel.findOne({$and: [{_id}, {type}]}).exec();
    if(user?.image) user.image = this.awsService.getUrl(user?.image);
    return user;
  }

  findWallet(id: string) {
    return this.UsersModel.findOne({_id: id}, {wallet: 1, _id: 0});
  }

  async info(id: string) {
    const user = await this.UsersModel.findOne({_id: id}, {name: 1, wallet: 1, phoneNumber: 1, type: 1, city: 1, image: 1, _id: 0}).populate({path: "wallet", select: {points: 1, amount: 1, _id: 0}});
    if(user?.image) user.image = this.awsService.getUrl(user?.image);
    return user;
  }

  async update(id: string, updateUserInfo: UpdateUserInfo) {
    if(updateUserInfo?.phoneNumber){
      let E0011 = await this.findByPhoneNumber(updateUserInfo.phoneNumber);
      if(E0011 && id != E0011._id){
        throw new BadRequestException('phoneNumber E0011');
      }
    }
    if (updateUserInfo?.email) {
      let E0002 = await this.findByEmail(updateUserInfo.email);
      if(E0002 && id != E0002._id) throw new BadRequestException('email E0002')
    }
    if(updateUserInfo?.image){
      const { image } = await this.UsersModel.findOne({_id: id}, {image: 1, _id: 0});
      if( image ) this.awsService.removeImage(image);
    }
    await this.UsersModel.findByIdAndUpdate(id, updateUserInfo);
    return "Success";
  }

  async password(id: string, passwordUserInput: PasswordUserInput) {
    const user = await this.findOne(id)
    const checkPassword = await user.comparePassword(passwordUserInput.oldPassword);
    if(checkPassword){
      const salt = await genSalt();
      const hashed = await hash(passwordUserInput.password, salt)
      await this.UsersModel.findByIdAndUpdate(id, {password: hashed}).exec();
      return "Success"
    } else {
      throw new BadRequestException('password E0005')
    }
  }

  async logout(id: string){
    await this.UsersModel.findByIdAndUpdate(id, {refreshToken: null})
  }

  async refresh(id: string, token: string){
    const user = await this.UsersModel.findById(id);
    if(!user) throw new NotFoundException('Access Denied');
    const isMatched = user.compareToken(token);
    if (!isMatched) throw new ForbiddenException('Access Denied');
    return user;
  }

  async delete(id: string) {
    await this.UsersModel.findByIdAndUpdate(id, {state: 'Deleted'}).exec();
    return "Success"
  }

  //? -> private services

  async getCreatedAt(_id: string): Promise<Partial<User>> {
    return this.UsersModel.findOne({_id}, {createdAt: 1});
  }

  async findByPhoneNumber(phoneNumber: string) {
    const user = await this.UsersModel.findOne({phoneNumber}).exec();
    if(user?.image) user.image = this.awsService.getUrl(user?.image);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.UsersModel.findOne({email}).exec();
    if(user?.image) user.image = this.awsService.getUrl(user?.image);
    return user;
  }

  async updateAny(id: string, updateUserInput: UpdateUserInput) {
      await this.UsersModel.findByIdAndUpdate(id, updateUserInput);
    return {message: "account updated"};
  }

  async home() {
    const users = await this.UsersModel.countDocuments();
    const recentlyUsers = await this.UsersModel.find().sort({_id: -1}).limit(10).select(["name", "image", "phoneNumber"]);
    for(const single of recentlyUsers){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return { users, recentlyUsers };
  }

  async usersReport(date: string){
    const year = new Date(date);
    let result = months;
    const users = await this.UsersModel.aggregate([
      {$match: {$and: [ {createdAt: {$gte: year}}, {createdAt: {$lte: new Date()}} ] }},
      {$group: {_id: "createAt", total: {$push: "$createdAt"},}},
    ]);
    for(const single of users[0]?.total){
      result = {...result, [`m${new Date(single).getMonth()}`]: {...result[`m${new Date(single).getMonth()}`], [`d${new Date(single).getDate()}`]: result[`m${new Date(single).getMonth()}`][`d${new Date(single).getDate()}`]+1}}
    }
    return result;
  }

}
