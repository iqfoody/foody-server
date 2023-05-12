import { Injectable } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressesDocument } from 'src/models/addresses.schema';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel("Addresses") private AddressesModel: Model<AddressesDocument>,
  ) {}

  //? -> dashborad...

  create(createAddressInput: CreateAddressInput) {
    return this.AddressesModel.create(createAddressInput);
  }

  findAll(user: string) {
    return this.AddressesModel.find({user});
  }

  findOne(id: string) {
    return this.AddressesModel.findById(id);
  }

  async update(id: string, updateAddressInput: UpdateAddressInput) {
    await this.AddressesModel.findByIdAndUpdate(id, updateAddressInput);
    return "Success";
  }

  async remove(id: string) {
    await this.AddressesModel.findByIdAndDelete(id);
    return "Success";
  }

  //? -> application...

  findAddresses(user: string) {
    return this.AddressesModel.find({user});
  }

  findAddress(id: string, user: string) {
    return this.AddressesModel.findOne({$and: [{_id: id}, {user}]});
  }

  async updateAddress(id: string, updateAddressInput: UpdateAddressInput, user: string) {
    await this.AddressesModel.findOneAndUpdate({$and: [{_id: id}, {user}]}, updateAddressInput);
    return "Success";
  }

  async removeAddress(id: string, user: string) {
    await this.AddressesModel.findOneAndDelete({$and: [{_id: id}, {user}]});
    return "Success";
  }
}
