import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateRateInput } from './dto/create-rate.input';
import { UpdateRateInput } from './dto/update-rate.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId, mongo } from 'mongoose';
import { RatesDocument } from 'src/models/rates.schema';
import { AwsService } from 'src/aws/aws.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RatesService {
  constructor(
    @InjectModel("Rates") private RatesModel: Model<RatesDocument>,
    @Inject(forwardRef(()=> UsersService)) private usersService: UsersService,
    private readonly awsService: AwsService,
  ) {}

  create(createRateInput: CreateRateInput) {
    return this.RatesModel.create(createRateInput);
  }

  async rateDriver(createRateInput: CreateRateInput){
    if(!createRateInput?.driver || !createRateInput?.user) throw new BadRequestException("driver & user required");
    if(!isValidObjectId(createRateInput.driver)) throw new BadRequestException("There isn't driver with this id");
    const { _id } = await this.usersService.findId(createRateInput.user);
    await this.RatesModel.create({...createRateInput, user: _id});
    return "Success";
  }

  async rateResaurant(createRateInput: CreateRateInput){
    if(!createRateInput?.restaurant || !createRateInput?.user) throw new BadRequestException("restaurant & user required");
    if(!isValidObjectId(createRateInput.restaurant)) throw new BadRequestException("There isn't restaurant with this id");
    const rate = await this.RatesModel.create(createRateInput);
    if(!rate) throw new BadRequestException("rating hasn't created.")
    const objectId = new mongo.ObjectId(createRateInput.restaurant);
    const result: any = await this.RatesModel.aggregate([ {$match: { restaurant: objectId }}, {$group: { _id: "$restaurant", rating: {$avg: "$rate"}, rates: {$sum: 1} } } ]);
    if(result[0]){
      const { rating, rates } = result[0];
      return { rating, rates }; 
    }
    return {rating: createRateInput.rate, rates: 1}; 
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

  async home(){
    const rating = await this.RatesModel.aggregate([
      {$group: {_id: "rating", rating: {$avg: "$rate"}, total: {$sum: 1}}}
    ]);
    const recentlyRating :any = await this.RatesModel.find().sort({_id: -1}).limit(10).populate({path: "user", select: {name: 1, image: 1}}).select(["-__v", "-_id", "-restaurant"]);
    for(const single of recentlyRating){
      if(single?.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {rating: rating[0]?.rating, recentlyRating, total: rating[0]?.total};
  }
}
