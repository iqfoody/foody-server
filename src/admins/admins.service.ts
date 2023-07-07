import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { InjectModel } from '@nestjs/mongoose';
import { IAdminsModel } from 'src/models/admins.schema';
import { AwsService } from 'src/aws/aws.service';
import { LoginInput } from 'src/auth/dto/login.input';
import { StateInput } from 'src/constants/state.input';
import { genSalt, hash } from 'bcryptjs';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel("Admins") private AdminsModel: IAdminsModel,
    @Inject(forwardRef(()=> WalletsService)) private walletsService: WalletsService,
    private readonly awsService: AwsService,
  ) {}

  async login(loginInput: LoginInput) {
    const admin = await this.AdminsModel.login(loginInput);
    if(admin?.image) admin.image = this.awsService.getUrl(admin?.image);
    return admin;
  }

  async create(_id: string, createAdminInput: CreateAdminInput) {
    const superAdmin = await this.AdminsModel.findOne({$and: [{_id}, {type: "Admin"}]});
    if(!superAdmin) throw new ForbiddenException("Access Denied");
    const admin = new this.AdminsModel(createAdminInput);
    if(createAdminInput?.image){
      const result = await this.awsService.createImage(createAdminInput.image, admin._id);
      admin.image = result?.Key;
    }
    // create wallet...
    const wallet = await this.walletsService.create({admin: admin._id});
    admin.wallet = wallet._id;
    await admin.save();
    if(admin?.image) admin.image = this.awsService.getUrl(admin?.image);
    return admin;
  }

  async findAll() {
    const admins = await this.AdminsModel.find({type: {$ne: "Admin"}}).populate("wallet");
    for(const admin of admins){
      if(admin?.image) admin.image = this.awsService.getUrl(admin?.image);
    }
    return admins;
  }

  async findOne(_id: string) {
    const admin = await this.AdminsModel.findOne({$and: [{_id}, {type: {$ne: "Admin"}} ]}).populate("wallet");
    if(admin?.image) admin.image = this.awsService.getUrl(admin?.image);
    return admin;
  }

  async findInfo(_id: string, token: string) {
    const admin = await this.AdminsModel.findOne({$and: [{_id}, {state: "Active"} ]});
    if(!admin) throw new NotFoundException('Access Denied');
    const isMatched = await admin.compareToken(token);
    if (!isMatched) return;
    if(admin?.image) admin.image = this.awsService.getUrl(admin?.image);
    return admin;
  }

  async findByEmail(email: string) {
    const admin = await this.AdminsModel.findOne({$and: [{email}, {type: {$ne: "Admin"}} ]});
    if(admin?.image) admin.image = this.awsService.getUrl(admin?.image);
    return admin;
  }

  async updateAny(_id: string, updateAdminInput: UpdateAdminInput) {
    await this.AdminsModel.findOneAndUpdate({$and: [{_id}, {type: {$ne: "Admin"}} ]}, updateAdminInput);
    return;
  }

  async updateAdmin(_id: string, updateAdminInput: UpdateAdminInput) {
    await this.AdminsModel.findOneAndUpdate({_id}, updateAdminInput);
    return;
  }

  async update(id: string, updateAdminInput: UpdateAdminInput) {
    let E0011 = await this.findByEmail(updateAdminInput.email);
    if(E0011 && id != E0011._id) throw new Error('email E0002')
    if(updateAdminInput?.image){
      const { image } = await this.AdminsModel.findOne({_id: updateAdminInput.id}, {image: 1, _id: 0});
      if(image) this.awsService.removeImage(image);
      const result = await this.awsService.createImage(updateAdminInput.image, id);
      await this.AdminsModel.findByIdAndUpdate(id, {...updateAdminInput, image: result?.Key});
    } else {
      await this.AdminsModel.findByIdAndUpdate(id, updateAdminInput);
    }
    return "admin updated";
  }

  async passwordAdmin(id: string, updatePasswordAdmin: UpdatePasswordUser) {
    const salt = await genSalt();
    const hashed = await hash(updatePasswordAdmin.password, salt)
    await this.AdminsModel.findByIdAndUpdate(id, {password: hashed, refreshToken: null});
    return "Success";
  }

  async state(stateInput: StateInput) {
    await this.AdminsModel.findOneAndUpdate({$and: [{_id: stateInput.id}, {type: {$ne: "Admin"}}]}, stateInput);
    return "success";
  }

  async logout(_id: string){
    await this.AdminsModel.findOneAndUpdate({$and: [{_id}, {state: "Active"}, {refreshToken: {$ne: null} }]}, {refreshToken: null})
  }

  async refresh(id: string, token: string){
    const admin = await this.AdminsModel.findById(id);
    if(!admin) throw new NotFoundException('Access Denied');
    const isMatched = await admin.compareToken(token);
    if (!isMatched) return;
    return admin;
  }

  async remove(_id: string) {
    const result = await this.AdminsModel.findOne({$and: [{_id}, {type: {$ne: "Admin"}}]}, {image: 1, _id: 0});
    try {
      if(result?.image) await this.awsService.removeImage(result.image);
      await this.walletsService.removeAdmin(_id);
      await this.AdminsModel.findOneAndDelete({$and: [{_id}, {type: {$ne: "Admin"}}]});
      return "success";
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
