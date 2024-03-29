import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
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
import { ResetAdminWallet } from 'src/admins/dto/reset-admin-wallet.input';

@Injectable()
export class TransactionsService {
    constructor(
    @InjectModel("Transactions") private TransactionsModel: Model<TransactionsDocument>,
    @Inject(forwardRef(() => OrdersService)) private ordersService: OrdersService,
    @Inject(forwardRef(() => AdminsService)) private adminsService: AdminsService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject(forwardRef(() => WalletsService)) private walletsService: WalletsService,
    private readonly awsService: AwsService
  ) {}

  //? internal service...
  async createTransaction(createTransactionInput: CreateTransactionInput) {
    let wallet = {_id: '', amount: 0, points: 0};
    if(createTransactionInput?.user){
      wallet = await this.walletsService.findUserWallet(createTransactionInput.user);
    } else if(createTransactionInput?.driver) {
      wallet = await this.walletsService.findDriverWallet(createTransactionInput.driver);
    }
    if(!wallet) throw new BadRequestException("Sorry, you havn't access to this wallet");
    if(createTransactionInput?.procedure === "Plus"){
      if(createTransactionInput?.type === "Amount"){
        const newAmount = wallet.amount + createTransactionInput.amount;
        await this.walletsService.update(wallet._id, {amount: newAmount});
      } else if(createTransactionInput?.type === "Points"){
        const newPoints = wallet.points + createTransactionInput.amount;
        await this.walletsService.update(wallet._id, {points: newPoints});
      } else throw new BadRequestException("Sorry, we can't accept this procedure");
      // end check Plus...
    } else if(createTransactionInput?.procedure === "Minus"){
      if(createTransactionInput?.type === "Amount"){
        const newAmount = wallet.amount - createTransactionInput.amount >= 0 ? wallet.amount - createTransactionInput.amount : 0;
        await this.walletsService.update(wallet._id, {amount: newAmount});
      } else if(createTransactionInput?.type === "Points"){
        const newPoints = wallet.points - createTransactionInput.amount >= 0 ? wallet.points - createTransactionInput.amount : 0;
        await this.walletsService.update(wallet._id, {points: newPoints});
      } else throw new BadRequestException("Sorry, we can't accept this procedure");
      // end check Minus...
    } else throw new BadRequestException("Sorry, we can't accept this procedure");
    // set previous from wallet...
    if(createTransactionInput.type === "Amount"){
      await this.TransactionsModel.create({...createTransactionInput, previous: wallet.amount});
    } else if(createTransactionInput.type === "Points"){
      await this.TransactionsModel.create({...createTransactionInput, previous: wallet.points});
    }
    return;
  }

  async updateTransaction(updateTransactionInput: UpdateTransactionInput) {
    const transaction = await this.TransactionsModel.findOne({$and: [{order: updateTransactionInput.order}, {user: updateTransactionInput.user}]});
    if(!transaction) throw new BadRequestException("There isn't transaction with this order");
    const wallet = await this.walletsService.findUserWallet(updateTransactionInput.user);
    if(transaction.type === "Amount"){
      if(transaction.amount > updateTransactionInput.amount){
        const newAmount = wallet.amount + (transaction.amount - updateTransactionInput.amount);
        await this.walletsService.update(wallet._id, {amount: newAmount});
      } else if(transaction.amount < updateTransactionInput.amount){
        const newAmount = wallet.amount - (updateTransactionInput.amount - transaction.amount);
        await this.walletsService.update(wallet._id, {amount: newAmount});
      }
    } else if(transaction.type === "Points"){
      if(transaction.amount > updateTransactionInput.amount){
        const newPoints = wallet.points + (transaction.amount - updateTransactionInput.amount);
        await this.walletsService.update(wallet._id, {points: newPoints});
      } else if(transaction.amount < updateTransactionInput.amount){
        const newPoints = wallet.points - (updateTransactionInput.amount - transaction.amount);
        await this.walletsService.update(wallet._id, {points: newPoints});
      }
    }
    return;
  }

  async cancelTransaction(order: string, user: string) {
    const transaction = await this.TransactionsModel.findOne({$and: [{order}, {user}]});
    const wallet = await this.walletsService.findUserWallet(user);
    if(!transaction || !wallet) throw new BadRequestException("Server can't find order transaction, wallet user");
    if(transaction?.type === "Amount"){
      if(transaction.procedure === "Minus"){
        await this.walletsService.update(wallet._id, {amount: (wallet.amount + transaction.amount)})
      } else if(transaction.procedure === "Plus"){
        await this.walletsService.update(wallet._id, {amount: (wallet.amount - transaction.amount)})
      }
    } else if(transaction?.type === "Points"){
      if(transaction.procedure === "Minus"){
        await this.walletsService.update(wallet._id, {points: (wallet.points + transaction.amount)})
      } else if(transaction.procedure === "Plus"){
        await this.walletsService.update(wallet._id, {points: (wallet.points - transaction.amount)})
      } else throw new BadRequestException("Server, can't cancel order transaction");
    }
    await this.TransactionsModel.findByIdAndUpdate(transaction._id, {state: "Canceled", description: "transaction has been canceled"});
    return "Success";
  }

  async completeTransaction(order: string, user: string) {
    const transaction = await this.TransactionsModel.findOne({$and: [{order}, {user}]});
    if(!transaction) throw new BadRequestException("Server can't find order transaction");
    const updatedTransaction = await this.TransactionsModel.findByIdAndUpdate(transaction._id, {state: "Completed"});
    if(!updatedTransaction) throw new BadRequestException("Server can't complete this transaction");
    return "Success";
  }

  async findAll(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({user: {$exists: true}}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({user: {$exists: true}});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findPoints(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({$and: [{type: "Points"}, {user: {$exists: true}}]}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({$and: [{type: "Points"}, {user: {$exists: true}}]});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findAmount(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({$and: [{type: "Amount"}, {user: {$exists: true}}]}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({$and: [{type: "Amount"}, {user: {$exists: true}}]});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findPointsUser(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({$and: [{user: limitEntity?.user}, {type: "Points"}]}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({$and: [{user: limitEntity?.user}, {type: "Points"}]});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findAmountUser(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({$and: [{user: limitEntity?.user}, {type: "Amount"}]}).populate({path: "user", select: {name: 1, image: 1}}).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({$and: [{user: limitEntity?.user}, {type: "Amount"}]});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findAmountDriver(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({$and: [{driver: limitEntity?.user}, {type: "Amount"}]}).populate([{path: "user", select: {name: 1, image: 1}}, {path: "admin", select: {name: 1, image: 1}}]).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({$and: [{driver: limitEntity?.user}, {type: "Amount"}]});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
      if(single.admin?.image) single.admin.image = this.awsService.getUrl(single.admin.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findAllAdmin(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({admin: limitEntity?.user}).populate([{path: "user", select: {name: 1, image: 1}}, {path: "driver", select: {name: 1, image: 1}}]).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({admin: limitEntity?.user});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findAmountAdmin(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({$and: [{admin: limitEntity?.user}, {type: "Amount"}]}).populate([{path: "user", select: {name: 1, image: 1}}, {path: "driver", select: {name: 1, image: 1}}]).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({$and: [{admin: limitEntity?.user}, {type: "Amount"}]});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
      if(single.driver?.image) single.driver.image = this.awsService.getUrl(single.driver.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findPointsAdmin(limitEntity: LimitEntity) {
    const skipIndex = limitEntity.page * limitEntity.page;
    const transactions: any = await this.TransactionsModel.find({$and: [{admin: limitEntity?.user}, {type: "Points"}]}).populate([{path: "user", select: {name: 1, image: 1}}, {path: "driver", select: {name: 1, image: 1}}]).sort({_id: -1}).limit(limitEntity.limit).skip(skipIndex);
    const total = await this.TransactionsModel.countDocuments({$and: [{admin: limitEntity?.user}, {type: "Points"}]});
    for(const single of transactions){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    return {data: transactions, pages: Math.ceil(total/limitEntity.limit)};
  }

    //? dahsboard service...

async create(createTransactionInput: CreateTransactionInput, admin: boolean) {
  let transaction: TransactionsDocument;
  let wallet = {_id: '', amount: 0, points: 0};
  let adminWallet = {_id: '', amount: 0, points: 0};
  if(createTransactionInput?.user){
    wallet = await this.walletsService.findUserWallet(createTransactionInput.user);
  } else if(createTransactionInput?.driver) {
    wallet = await this.walletsService.findDriverWallet(createTransactionInput.driver);
  }
  if(!wallet) throw new BadRequestException("Sorry, you havn't access to this wallet");
  if(!admin) {
    adminWallet = await this.walletsService.findAdminWallet(createTransactionInput.admin);
    if(!adminWallet) throw new BadRequestException("Sorry, you havn't access to admin wallet");
  }
  if(createTransactionInput.procedure){
    if(createTransactionInput.type === "Amount"){
      const newAmount = wallet.amount + createTransactionInput.amount;
      await this.walletsService.update(wallet._id, {amount: newAmount});
      if(createTransactionInput?.user && !admin){
        const newAdminAmount = adminWallet.amount + createTransactionInput.amount;
        await this.walletsService.update(adminWallet._id, {amount: newAdminAmount});
      }
    } else if(createTransactionInput?.type === "Points"){
      const newPoints = wallet.points + createTransactionInput.amount;
      await this.walletsService.update(wallet._id, {points: newPoints});
      if(createTransactionInput?.user && !admin){
        const newAdminPoints = adminWallet.points + createTransactionInput.amount;
        await this.walletsService.update(adminWallet._id, {points: newAdminPoints});
      }
    } else throw new BadRequestException("Sorry, we can't accept this procedure");
    // end check Plus...
  } else throw new BadRequestException("Sorry, we can't accept this procedure");
  // set previous from wallet...
  if(createTransactionInput.type === "Amount"){
    transaction = await this.TransactionsModel.create({...createTransactionInput, previous: wallet.amount, state: "Completed"});
  } else if(createTransactionInput.type === "Points"){
    transaction = await this.TransactionsModel.create({...createTransactionInput, previous: wallet.points, state: "Completed"});
  }
  const result: any = await transaction.populate([{path: "user", select: {name: 1, phoneNumber: 1, image: 1}}, {path: "driver", select: {name: 1, phoneNumber: 1, image: 1}}, {path: "admin", select: {name: 1, phoneNumber: 1, image: 1}}]);
  if(result?.user?.image) result.user.image = this.awsService.getUrl(result.user.image);
  if(result?.driver?.image) result.driver.image = this.awsService.getUrl(result.driver.image);
  if(result?.admin?.image) result.admin.image = this.awsService.getUrl(result.admin.image);
  return result;
}

async resetAdmin(admin: string, resetAdminWallet: ResetAdminWallet) {
  const wallet = await this.walletsService.resetAdminWallet(resetAdminWallet);
  if(resetAdminWallet.type === "Amount"){
    if(wallet.amount === 0) return "Success";
    await this.TransactionsModel.create({admin, type: resetAdminWallet.type, amount: 0, previous: wallet.amount, procedure: "Minus", state: "Completed", description: "reset admin wallet from management" });
  } else {
    if(wallet.points === 0) return "Success";
    await this.TransactionsModel.create({admin, type: resetAdminWallet.type, amount: 0, previous: wallet.points, procedure: "Minus", state: "Completed", description: "reset admin wallet from management" });
  }
  return "Success";
}

  async findOne(id: string) {
    const transaction: any = await this.TransactionsModel.findById(id).populate(["user", "admin", "driver", "order"]);
    if(transaction.user?.image) transaction.user.image = this.awsService.getUrl(transaction.user.image);
    if(transaction.admin?.image) transaction.admin.image = this.awsService.getUrl(transaction.admin.image);
    if(transaction.driver?.image) transaction.driver.image = this.awsService.getUrl(transaction.driver.image);
    return transaction;
  }

  async update(id: string, updateTransactionInput: UpdateTransactionInput) {
    await this.TransactionsModel.findByIdAndUpdate(id, updateTransactionInput);
    return "Success"
  }

  async remove(id: string) {
    await this.TransactionsModel.findByIdAndDelete(id);
    return "Success";
  }

  async home() {
    //let transactions = {minusPoints: 0, plusPoints: 0, minusAmount: 0, plusAmount: 0};
    const data = new Date().setDate(new Date().getDate() -7);
    const minusPoints = await this.TransactionsModel.aggregate([
      {$match: {$and: [ {createdAt: {$gt: new Date(data)}}, {type: "Points"}, {procedure: "Minus"} ] }},
      {$group: {_id: "Points", total: {$sum: "$amount"} }},
    ]);

    const plusPoints = await this.TransactionsModel.aggregate([
      {$match: {$and: [ {createdAt: {$gt: new Date(data)}}, {type: "Points"}, {procedure: "Plus"} ] }},
      {$group: {_id: "Points", total: {$sum: "$amount"} }},
    ]);

    const minusAmount = await this.TransactionsModel.aggregate([
      {$match: {$and: [ {createdAt: {$gt: new Date(data)}}, {type: "Amount"}, {procedure: "Minus"} ] }},
      {$group: {_id: "Amount", total: {$sum: "$amount"} }},
    ]);

    const plusAmount = await this.TransactionsModel.aggregate([
      {$match: {$and: [ {createdAt: {$gt: new Date(data)}}, {type: "Amount"}, {procedure: "Plus"} ] }},
      {$group: {_id: "Amount", total: {$sum: "$amount"} }},
    ]);
    return {minusAmount: minusAmount[0]?.total || 0, plusAmount: plusAmount[0]?.total || 0, minusPoints: minusPoints[0]?.total || 0, plusPoints: plusPoints[0]?.total || 0};
  }

}
