import { BadRequestException, Inject, Injectable, NotAcceptableException, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromoCodesDocument } from 'src/models/promoCodes.schema';
import { StateInput } from 'src/constants/state.input';
import { UsersService } from 'src/users/users.service';
import { CheckPromoCodeInput } from './dto/check-promo-code.input';

@Injectable()
export class PromoCodesService {
  constructor(
    @InjectModel("PromoCodes") private PromoCodesModel: Model<PromoCodesDocument>,
    @Inject(forwardRef(()=> UsersService)) private usersService: UsersService,
  ) {}

  //? application...

  async findPromoCodes(phoneNumber: string) {
    const { _id } = await this.usersService.findId(phoneNumber);
    return this.PromoCodesModel.find({$and: [{user: _id}, {state: "Active"}]});
  }

  async check(name: string, phoneNumber: string) {
    if(!name) throw new BadRequestException("this promo code isn't valid");
    const { _id } = await this.usersService.findId(phoneNumber);
    const promoCode = await this.PromoCodesModel.findOne({$and: [{name}, {expire: {$gte: new Date()}}, {state: "Active"}]});
    if(promoCode){
      if(promoCode?.users && promoCode?.users.includes(_id as any)) throw new NotAcceptableException('Promo code had used');
      if(promoCode?.usageTimes && promoCode?.usageTimes > 0 && promoCode?.usageTimes <= promoCode?.users?.length) throw new NotAcceptableException('Promo code had expired');
      if(promoCode.isPublic){
        return {name: promoCode.name, discount: promoCode?.discount, type: promoCode.type};
      } else {
        if(promoCode?.user && _id == promoCode?.user){
          return {name: promoCode.name, discount: promoCode?.discount, type: promoCode.type};
        } else throw new NotFoundException('Promo code not found');
      }
    } else throw new NotFoundException('Promo code not found');
  }

  async usePromoCode(name: string, user: string){
    const promoCode = await this.PromoCodesModel.findOne({$and: [{name}, {expire: {$gte: new Date()}}, {state: "Active"}]});
    if(promoCode){
      if(promoCode?.users && promoCode?.users.includes(user as any)) throw new NotAcceptableException('Promo code had used');
      if(promoCode?.usageTimes && promoCode?.usageTimes > 0 && promoCode?.usageTimes <= promoCode?.users?.length) throw new NotAcceptableException('Promo code had expired');
      if(promoCode.isPublic){
        promoCode.users.push(user as any);
        await this.PromoCodesModel.findByIdAndUpdate(promoCode._id, {users: promoCode.users});
        return "Verifyed";
      } else {
        if(promoCode?.user && user == promoCode?.user){
          promoCode.users.push(user as any);
          await this.PromoCodesModel.findByIdAndUpdate(promoCode._id, {users: promoCode.users});
          return "Verifyed";
        } else throw new NotFoundException('Promo code not found');
      }
    } else throw new NotFoundException('Promo code not found');
  }

  //? dashboard...

  async create(createPromoCodeInput: CreatePromoCodeInput) {
    const { name, user, type, discount, isPublic, expire, usageTimes } = createPromoCodeInput;
    if(isPublic){
      return this.PromoCodesModel.create({name, type, discount, isPublic, expire, usageTimes});
    } else {
      const promoCode = await this.PromoCodesModel.create(createPromoCodeInput);
      return promoCode.populate("user");
    }
  }

  async checkPromoCode(checkPromoCodeInput: CheckPromoCodeInput) {
    if(!checkPromoCodeInput?.name || !checkPromoCodeInput?.user) throw new BadRequestException("this promo code isn't valid");
    const { _id } = await this.usersService.findOne(checkPromoCodeInput.user);
    const promoCode = await this.PromoCodesModel.findOne({$and: [{name: checkPromoCodeInput.name}, {expire: {$gte: new Date()}}, {state: "Active"}]});
    if(promoCode){
      if(promoCode?.users && promoCode?.users.includes(_id as any)) throw new NotAcceptableException('Promo code had used');
      if(promoCode?.usageTimes && promoCode?.usageTimes > 0 && promoCode?.usageTimes <= promoCode?.users?.length) throw new NotAcceptableException('Promo code had expired');
      if(promoCode.isPublic){
        return promoCode;
      } else {
        if(promoCode?.user && _id == promoCode?.user){
          return promoCode;
        } else throw new NotFoundException('Promo code not found');
      }
    } else throw new NotFoundException('Promo code not found or expire');
  }

  findAll() {
    return this.PromoCodesModel.find().populate("user").sort({_id: -1});
  }

  findOne(id: string) {
    return this.PromoCodesModel.findById(id).populate("user");
  }

  async update(id: string, updatePromoCodeInput: UpdatePromoCodeInput) {
    await this.PromoCodesModel.findByIdAndUpdate(id, updatePromoCodeInput);
    return "Success";
  }

  async state(stateInput: StateInput) {
    await this.PromoCodesModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  async remove(id: string) {
    await this.PromoCodesModel.findByIdAndDelete(id);
    return "Success";
  }
}
