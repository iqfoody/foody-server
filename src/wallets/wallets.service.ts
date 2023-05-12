import { Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { InjectModel } from '@nestjs/mongoose';
import { WalletsDocument } from 'src/models/wallets.schema';
import { Model } from 'mongoose';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel("Wallets") private WalletsModel: Model<WalletsDocument>,
  ) {}

  create(createWalletInput?: CreateWalletInput) {
    return this.WalletsModel.create(createWalletInput);
  }

  findAll() {
    return this.WalletsModel.find();
  }

  findOne(id: string) {
    return this.WalletsModel.findById(id);
  }

  async update(id: string, updateWalletInput: UpdateWalletInput) {
    await this.WalletsModel.findByIdAndUpdate(id, updateWalletInput);
    return "Success";
  }

  async remove(id: string) {
    await this.WalletsModel.findByIdAndDelete(id);
    return "Success";
  }
}
