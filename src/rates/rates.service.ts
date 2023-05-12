import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRateInput } from './dto/create-rate.input';
import { UpdateRateInput } from './dto/update-rate.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RatesDocument } from 'src/models/rates.schema';

@Injectable()
export class RatesService {
  constructor(
    @InjectModel("Rates") private RatesModel: Model<RatesDocument>,
  ) {}

  create(createRateInput: CreateRateInput) {
    return this.RatesModel.create(createRateInput);
  }

  async rateDriver(createRateInput: CreateRateInput){
    if(!createRateInput?.driver || !createRateInput?.user) throw new BadRequestException("driver & user required");
    await this.RatesModel.create(createRateInput);
    return "Success";
  }

  async rateResaurant(createRateInput: CreateRateInput){
    if(!createRateInput?.restaurant || !createRateInput?.user) throw new BadRequestException("restaurant & user required");
    const rates: any = await this.RatesModel.aggregate([ {$match: { restaurant: {$eq: {$toObjectId: createRateInput.restaurant}} }}, {$group: { _id: "$restaurant", rating: {$avg: "$rate"} } } ]);
    const total = await this.RatesModel.countDocuments({restaurant: createRateInput.restaurant})
    console.log(createRateInput.restaurant)
    console.log(rates, total)
    const newValue = createRateInput.rate / total +1;
    const newRatingValue = rates.rate + newValue;
    await this.RatesModel.create(createRateInput);
    return {rating: newRatingValue, rates: total+1}; 
  }

  findAll() {
    return this.RatesModel.find();
  }

  findOne(id: string) {
    return this.RatesModel.findById(id);
  }

  async update(id: string, updateRateInput: UpdateRateInput) {
    await this.RatesModel.findByIdAndUpdate(id, updateRateInput);
    return "Success";
  }

  async remove(id: string) {
    await this.RatesModel.findByIdAndDelete(id);
    return "Success";
  }
}
