import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromoCodesDocument } from 'src/models/promoCodes.schema';
import { StateInput } from 'src/constants/state.input';

@Injectable()
export class PromoCodesService {
  constructor(
    @InjectModel("PromoCodes") private PromoCodesModel: Model<PromoCodesDocument>,
  ) {}

  //? application...

  findPromoCodes(user: string) {
    return this.PromoCodesModel.find({$and: [{user}, {state: "Active"}]});
  }

  async check(name: string, user: string) {
    if(!name) throw new BadRequestException("this promo code isn't valid")
    const promoCode = await this.PromoCodesModel.findOne({$and: [{name}, {user}, {public: false}, {state: "Active"}]});
    if(promoCode && promoCode?.users && promoCode?.users?.includes(user as any) || new Date(promoCode?.expire) < new Date()){
      throw new NotAcceptableException('Promo code expired');
    } else if(promoCode) {
      return {_id: promoCode._id, name: promoCode.name, discount: promoCode?.discount, type: promoCode.type};
    } else {
      const publicPromoCode = await this.PromoCodesModel.findOne({$and: [{name}, {public: true}, {state: "Active"}]});
      if(publicPromoCode && publicPromoCode?.users && publicPromoCode?.users.includes(user as any)) {
        throw new NotAcceptableException('Promo code had used');
      } else if (publicPromoCode){
        return {_id: publicPromoCode._id, name: publicPromoCode.name, discount: publicPromoCode.discount, type: publicPromoCode.type};
      }
    }
    return new NotFoundException('Promo code not found');
  }

  async usePromoCode(name: string, user: string){
    const promoCode = await this.PromoCodesModel.findOne({$and: [{name}, {user}, {public: false}, {state: "Active"}]});
    if(promoCode && promoCode?.users && promoCode?.users?.includes(user as any)){
      return new NotAcceptableException('Promo code expired');
    } else if(promoCode) {
      promoCode.users.push(user as any);
      await this.PromoCodesModel.findByIdAndUpdate(promoCode._id, {users: promoCode.users});
      return "Verifyed";
    } else {
      const publicPromoCode = await this.PromoCodesModel.findOne({$and: [{name}, {public: true}, {state: "Active"}]});
      if(publicPromoCode && publicPromoCode?.users && publicPromoCode?.users.includes(user as any)) {
        return new NotAcceptableException('Promo code had used');
      } else if (publicPromoCode){
        publicPromoCode.users.push(user as any);
        await this.PromoCodesModel.findByIdAndUpdate(publicPromoCode._id, {users: publicPromoCode.users});
        return "Verifyed";
      }
    }
    return new NotFoundException('Promo code not found');
  }

  //? dashboard...

  async create(createPromoCodeInput: CreatePromoCodeInput) {
    const { name, user, type, discount, isPublic, expire } = createPromoCodeInput;
    if(isPublic){
      return this.PromoCodesModel.create({name, type, discount, isPublic, expire});
    } else {
      const promoCode = await this.PromoCodesModel.create(createPromoCodeInput);
      return promoCode.populate("user");
    }
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
