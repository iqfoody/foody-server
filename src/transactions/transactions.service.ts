import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { InjectModel } from '@nestjs/mongoose';
import { AdminsService } from 'src/admins/admins.service';
import { UsersService } from 'src/users/users.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { OrdersService } from 'src/orders/orders.service';
import { Model } from 'mongoose';
import { TransactionsDocument } from 'src/models/transactions.schema';
import { LimitEntity } from 'src/constants/limitEntity';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class TransactionsService {
    constructor(
    @InjectModel("Transactions") private TransactionsModel: Model<TransactionsDocument>,
    // private readonly adminsService: AdminsService,
    // private readonly usersService: UsersService,
    // private readonly walletsService: WalletsService,
    // private readonly ordersService: OrdersService,
    private readonly awsService: AwsService
  ) {}

  async create(createTransactionInput: CreateTransactionInput) {
    return this.TransactionsModel.create(createTransactionInput);
  }

  async findAll(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    //TODO: populate user, admin, order...
    const transactions: any = await this.TransactionsModel.find().populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments();
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findPoints(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    //TODO: populate user, admin, order...
    const transactions: any = await this.TransactionsModel.find({type: "Points"}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({type: "Points"});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findAmount(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    //TODO: populate user, admin, order...
    const transactions: any = await this.TransactionsModel.find({type: "Amount"}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({type: "Amount"});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findForUser(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    //TODO: populate user, admin, order...
    const transactions: any = await this.TransactionsModel.find({user: limitEntity?.user}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({user: limitEntity?.user});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findForAdmin(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    //TODO: populate user, admin, order...
    const transactions: any = await this.TransactionsModel.find({admin: limitEntity?.user}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({admin: limitEntity?.user});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  findOne(id: string) {
    return this.TransactionsModel.findById(id);
  }

  async update(id: string, updateTransactionInput: UpdateTransactionInput) {
    await this.TransactionsModel.findByIdAndUpdate(id, updateTransactionInput);
    return "Success"
  }

  async remove(id: string) {
    await this.TransactionsModel.findByIdAndDelete(id);
    return "Success";
  }
}
