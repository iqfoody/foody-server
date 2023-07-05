import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { AddressesDocument } from 'src/models/addresses.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel("Addresses") private AddressesModel: Model<AddressesDocument>,
    @Inject(forwardRef(()=> UsersService)) private usersService: UsersService,
  ) {}

  //? -> dashborad...

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

  async create(createAddressInput: CreateAddressInput) {
    const { _id } = await this.usersService.findId(createAddressInput.user);
    return this.AddressesModel.create({...createAddressInput, user: _id});
  }

  async findAddresses(phoneNumber: string) {
    const { _id } = await this.usersService.findId(phoneNumber);
    return this.AddressesModel.find({user: _id}).select(["-__v", "-user"]);
  }

  async findAddress(id: string, phoneNumber: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't address with this id");
    const { _id } = await this.usersService.findId(phoneNumber);
    return this.AddressesModel.findOne({$and: [{_id: id}, {user: _id}]}).select(["-__v", "-user"]);
  }

  async updateAddress(updateAddressInput: UpdateAddressInput, phoneNumber: string) {
    if(!isValidObjectId(updateAddressInput?.id)) throw new BadRequestException("There isn't address with this id");
    const { _id } = await this.usersService.findId(phoneNumber);
    await this.AddressesModel.findOneAndUpdate({$and: [{_id: updateAddressInput.id}, {user: _id}]}, updateAddressInput);
    return "Success";
  }

  async removeAddress(id: string, phoneNumber: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't address with this id");
    const { _id } = await this.usersService.findId(phoneNumber);
    await this.AddressesModel.findOneAndDelete({$and: [{_id: id}, {user: _id}]});
    return "Success";
  }
  
  async clean(user: string){
    await this.AddressesModel.deleteMany({user});
    return "Success";
  }
}
