import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { InjectModel } from '@nestjs/mongoose';
import { WalletsDocument } from 'src/models/wallets.schema';
import { Model } from 'mongoose';
import { ResetAdminWallet } from 'src/admins/dto/reset-admin-wallet.input';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel("Wallets") private WalletsModel: Model<WalletsDocument>,
  ) {}

  create(createWalletInput: CreateWalletInput) {
    return this.WalletsModel.create(createWalletInput);
  }

  findAll() {
    return this.WalletsModel.find();
  }

  findOne(id: string) {
    return this.WalletsModel.findById(id);
  }

  findUserWallet(user: string){
    return this.WalletsModel.findOne({user});
  }

  findDriverWallet(driver: string){
    return this.WalletsModel.findOne({driver});
  }

  findAdminWallet(admin: string){
    return this.WalletsModel.findOne({admin});
  }

  async resetAdminWallet(resetAdminWallet: ResetAdminWallet){
    let wallet = { _id: '', amount: 0, points: 0 };
    if(resetAdminWallet.type === "Amount"){
      wallet = await this.WalletsModel.findOneAndUpdate({admin: resetAdminWallet.admin}, {amount: 0});
    } else if(resetAdminWallet.type === "Points"){
      wallet = await this.WalletsModel.findOneAndUpdate({admin: resetAdminWallet.admin}, {points: 0});
    } else throw new BadRequestException("Can't complete this procedure");
    return wallet;
  }

  async update(id: string, updateWalletInput: UpdateWalletInput) {
    await this.WalletsModel.findByIdAndUpdate(id, updateWalletInput);
    return "Success";
  }

  async remove(id: string) {
    await this.WalletsModel.findByIdAndDelete(id);
    return "Success";
  }

  async removeUser(user: string) {
    await this.WalletsModel.findOneAndDelete({user});
    return "Success";
  }

  async removeDriver(driver: string) {
    await this.WalletsModel.findOneAndDelete({driver});
    return "Success";
  }

  async removeAdmin(admin: string) {
    await this.WalletsModel.findOneAndDelete({admin});
    return "Success";
  }
}
