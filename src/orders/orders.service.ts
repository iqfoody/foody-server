import { BadRequestException, Inject, Injectable, NotAcceptableException, forwardRef } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId, mongo } from 'mongoose';
import { OrdersDocument } from 'src/models/orders.schema';
import { LimitEntity } from 'src/constants/limitEntity';
import { orderStatus } from 'src/constants/types.type';
import { StateInput } from 'src/constants/state.input';
import { MealsService } from 'src/meals/meals.service';
import { AwsService } from 'src/aws/aws.service';
import { PromoCodesService } from 'src/promo-codes/promo-codes.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { UsersService } from 'src/users/users.service';
import { RatesService } from 'src/rates/rates.service';
import { CreateRateOrderInput } from './dto/create-rate-order.input';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DriversService } from 'src/drivers/drivers.service';
import { Months } from 'src/constants/reportsResults.entity';
import { months } from 'src/constants/declearedMonths';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel("Orders") private OrdersModel: Model<OrdersDocument>,
    @Inject(forwardRef(() => MealsService)) private mealsService: MealsService,
    private readonly awsService: AwsService,
    private readonly promoCodeService: PromoCodesService,
    private readonly walletsService: WalletsService,
    private readonly usersService: UsersService,
    private readonly ratesService: RatesService,
    private readonly restaurantsService: RestaurantsService,
    private readonly driversService: DriversService,
    private readonly transactionsService: TransactionsService,
  ) {}

  //? -> application...

  async createOrder(createOrderInput: CreateOrderInput) {
    // -> check if user has an order not compeleted yet...
    if(!isValidObjectId(createOrderInput?.user) || !isValidObjectId(createOrderInput?.address) || !isValidObjectId(createOrderInput?.restaurant)) throw new BadRequestException("There isn't user or restaurant with this id")
    const ActiveOrder = await this.OrdersModel.findOne({$and: [{user: createOrderInput.user}, {restaurant: createOrderInput.restaurant}, {$and: [{state: {$ne: "Completed"}}, {state: {$ne: "Deleted"}}, {state: {$ne: "Canceled"}}]}]}, {_id:  1});
    if(ActiveOrder) throw new BadRequestException("you have order in ordered.");

    let demoOrderDate :any = {...createOrderInput, type: "Auto"};

    // -> get meals data & calculate total price...
    let totalPrice = 0;
    let totalPoints = 0;
    let pointsBack = 0;
    let price = 0;
    let priceAdditions = 0;
    let walletId = "";
    let newWallet = 0;
    let newPoints = 0;
    let transaction = {
      user: createOrderInput.user,
      amount: 0,
      previous: 0,
    };
    let usePromoCode = false;

    // -> restaurnat delivery price...
    const { deliveryPrice } = await this.restaurantsService.getDeliveryPrice(createOrderInput.restaurant);
    price += deliveryPrice;

    for(const single of createOrderInput.meals){
      let additions = [];
      let addIngredients = [];
      let removeIngredients = [];
      const meal = await this.mealsService.findExtention(single.meal, createOrderInput?.restaurant);
      if(!meal) throw new BadRequestException("can't create order with meals isn't in this restaurant")
      price += meal.price * single.quantity;
      totalPoints += (meal.points * meal.price) * single.quantity;
      pointsBack += ((meal.pointsBack / 100) * meal.price) * single.quantity;
      // -> check if ! payment with point calculate additions & ingredients...
      
              // -> get addition object & injected to order...
              if(single?.additions){
                for(const addition of single.additions){
                  const value = meal?.additions?.find((val: any) => val._id == addition);
                  if(value) {
                    additions = [...additions, value];
                    price += value.price;
                    totalPoints += (meal.points * value.price);
                    pointsBack += (meal.pointsBack / 100) * value.price;
                    priceAdditions += value.price;
                  }
                }
              }
              // -> get added ingredient object & injected to order...
              if(single?.addIngredients){
                for(const addIngredient of single.addIngredients){
                  const value = meal?.ingredients?.find((val: any) => val._id == addIngredient);
                  if(value) addIngredients = [...addIngredients, value]
                }
              }
              // -> get removed ingredient object & injected to order...
              if(single?.removeIngredients){
                for(const removeIngredient of single.removeIngredients){
                  const value = meal?.ingredients?.find((val: any) => val._id == removeIngredient);
                  if(value) removeIngredients = [...removeIngredients, value]
                }
              }
              // -> return new values...
              single.additions = additions;
              single.addIngredients = addIngredients;
              single.removeIngredients = removeIngredients;
    }

    // -> put price in totalPrice...
    totalPrice += price;

    // -> sync promo code if exist...
    if(createOrderInput?.promoCode && createOrderInput?.paymentMethod !== "Points"){
      const promoCode :any = await this.promoCodeService.check(createOrderInput.promoCode, createOrderInput.user);
      console.log(promoCode)
      if(!promoCode?._id) throw new BadRequestException("You can't use promo code dosn't exist")
      usePromoCode = true;
      if(promoCode.type === 'Price') {
        totalPrice += -promoCode.discount;
        demoOrderDate = {...demoOrderDate, discountType: "Price", discount: promoCode.discount, promoCode: promoCode.name};
        let precentValue = (price / promoCode.discount) / 100;
        pointsBack += - (pointsBack * precentValue);
        
      }
      if(promoCode.type === 'Percent') {
        totalPrice += - totalPrice * (promoCode.discount/100);
        demoOrderDate = {...demoOrderDate, discountType: "Percent", discount: promoCode.discount, promoCode: promoCode.name};
        pointsBack += - (pointsBack * (promoCode.discount / 100));
      }; 
    }

    // -> sync wallet with order...
    const user :any = await this.usersService.findWallet(createOrderInput.user);
    const wallet = await this.walletsService.findOne(user.wallet);
    demoOrderDate = {...demoOrderDate, walletPoints: wallet.points};
    if(createOrderInput?.paymentMethod !== 'Cash'){
      walletId = wallet?._id;
      if(wallet?.amount && createOrderInput?.paymentMethod === 'Wallet'){
        demoOrderDate = {...demoOrderDate, walletAmount: wallet.amount};
        // -> reset amount wallet...
        if(wallet.amount >= totalPrice){
          transaction = {...transaction, amount: totalPrice, previous: wallet.amount};
          newWallet = wallet.amount - totalPrice;
          totalPrice = 0;
        } else if(wallet?.amount > 0) {
          totalPrice += -wallet.amount;
          transaction = {...transaction, amount: wallet.amount, previous: wallet.amount};
          newWallet = 0;
        } else {
          createOrderInput = {...createOrderInput, paymentMethod: "Cash"}
        }
        
      } else if(wallet?.points && createOrderInput?.paymentMethod === 'Points'){
        // -> reset points wallet...
        if(totalPoints > wallet.points) throw new BadRequestException("your points is'nt enough");
        if(wallet.points >= totalPoints){
          newPoints = wallet.points - totalPoints;
          transaction = {...transaction, amount: totalPoints, previous: wallet?.points};
          //TODO: if add price additions of calculate with points ...?
          //? 1...
          //! totalPrice = deliveryPrice + priceAdditions;
          //? 2
          totalPrice = deliveryPrice;
        }
        
        // -> add total points to order...
        demoOrderDate = {...demoOrderDate, totalPoints}
      }

    }

    //TODO: return points back to wallet points user...

    // -> creating order...
    const order = await this.OrdersModel.create({...demoOrderDate, totalPrice, price, state: "InDelivery", deliveryPrice, pointsBack});
    if(!order) throw new BadRequestException("you order haven't created please try again later");
    if(usePromoCode && createOrderInput?.paymentMethod !== "Points") await this.promoCodeService.usePromoCode(createOrderInput.promoCode, createOrderInput.user);
    if(createOrderInput?.paymentMethod === "Wallet" && transaction.previous !== 0){
      await this.walletsService.update(walletId, {amount: newWallet});
      await this.transactionsService.create({...transaction, order: order?._id, type: "Amount", procedure: "Minus", paymentMethod: "Wallet", state: "Completed", description: "payed for cost order" });
    } else if(createOrderInput?.paymentMethod === "Points" && transaction.previous !== 0){
      await this.walletsService.update(walletId, {points: newPoints});
      await this.transactionsService.create({...transaction, order: order?._id, type: "Points", procedure: "Minus", paymentMethod: "Points", state: "Completed", description: "payed for cost order points"});
    }
    //TODO: send noti -> admins & driver? ...
    return order;
  }

  async findOrders(user: string, state?: orderStatus){
    let orders = [];
    if(state && state === "Deleted") return;
    if(!state){
      orders = await this.OrdersModel.find({$and: [{user}, {state: {$ne: "Deleted"}}]}).select(['-__v', '-updatedAt', '-type', '-user']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1} } ] );
    } else if(state) {
      orders = await this.OrdersModel.find({$and: [{user}, {state}]}).select(['-__v', '-updatedAt', '-type', '-user']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1}} ] );
    }
    for(const order of orders){
      if(order?.restaurant?.image) order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
      if(order?.meals){
        for(const meal of order.meals){
          if(meal?.meal?.image) meal.meal.image = this.awsService.getUrl(meal.meal.image)
        }
      }
    }
    return orders;
  }

  async findOrder(id: string, user: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    const order : any = await this.OrdersModel.findOne({$and: [{_id: id}, {user}, {state: {$ne: "Deleted"}}]}).select(['-__v', '-updatedAt', '-type', '-user']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1}} ] );
    if(order?.restaurant?.image) order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
    if(order?.meals){
      for(const meal of order.meals){
        if(meal?.meal?.image) meal.meal.image = this.awsService.getUrl(meal.meal.image)
      }
    }
    return order;
  }

    // -> this func. just for user & state = Pending...
  async cancelOrder(id: string, user: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    await this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {user}, {state: "Pending"}]}, {state: "Canceled"});
    return "Success";
  }

  // -> this func. just for driver & state = InDelivery...
  inDeliveryOrder(id: string, driver: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    return this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {driver}, {state: "InProgress"}]}, {state: "InDelivery"});
  }

  // -> this func. just for driver & state = InDelivery...
  async completeOrder(id: string, driver: string, recievedPrice: number) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    //TODO: send rating notification to user...
    const order = await this.OrdersModel.findOne({$and: [{_id: id}, {driver}, {state: "InDelivery"}]}, {totalPrice: 1, pointsBack: 1, user: 1, walletPoints: 1, walletAmount: 1});
    if(!order || order?.totalPrice > recievedPrice) throw new NotAcceptableException("There isn't order for this action or recieved price isn't enough");
    await this.OrdersModel.findByIdAndUpdate(order._id, {state: "Completed", recievedPrice});
    if(recievedPrice > order?.totalPrice){
      const amount = recievedPrice - order.totalPrice;
      await this.transactionsService.create({user: order.user as string, amount, previous: order?.walletAmount, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash back from completed order recieved amount by driver"})
    }
    await this.transactionsService.create({user: order.user as string, amount: order.pointsBack, previous: order?.walletPoints, order: order?._id, type: "Points", procedure: "Plus", paymentMethod: "Points", state: "Completed", description: "Points back from completed order"})
    return "Success";
  }

  //? delete after complete testing...
  // async testCompleteOrder(id: string,recievedPrice: number) {
  //   if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
  //   const order = await this.OrdersModel.findOne({$and: [{_id: id}, {state: "InDelivery"}]}, {totalPrice: 1, pointsBack: 1, user: 1, walletPoints: 1, walletAmount: 1});
  //   if(!order || order?.totalPrice > recievedPrice) throw new NotAcceptableException("There isn't order for this action or recieved price isn't enough");
  //   await this.OrdersModel.findByIdAndUpdate(order._id, {state: "Completed", recievedPrice});
  //   if(recievedPrice > order?.totalPrice){
  //     const amount = recievedPrice - order.totalPrice;
  //     await this.transactionsService.create({user: order.user as string, amount, previous: order?.walletAmount, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash back from completed order recieved amount by driver"})
  //   }
  //   await this.transactionsService.create({user: order.user as string, amount: order.pointsBack, previous: order?.walletPoints, order: order?._id, type: "Points", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Points back from completed order"})
  //   return "Success";
  // }

  // -> rating restaurnt & update order...
  async rateOrder(createRateOrderInput: CreateRateOrderInput){
    const { user, order, rate, description } = createRateOrderInput;
    if(!order || !user || !rate) throw new BadRequestException("order & user & rate required");
    if(!isValidObjectId(order)) throw new BadRequestException("There isn't order with this id");
    const currentOrder :any = await this.OrdersModel.findOne({$and: [{_id: order}, {user}, {hasRating: false}]});
    if(!currentOrder) throw new BadRequestException("you can't rate this order.");
    await this.OrdersModel.findByIdAndUpdate(currentOrder._id, {hasRating: true});
    const resultRate = await this.ratesService.rateResaurant({user, rate, description, restaurant: currentOrder.restaurant});
    if(resultRate?.rates && resultRate?.rating) await this.restaurantsService.update(currentOrder.restaurant, {rates: resultRate.rates, rating: resultRate.rating});
    return "Success";
  }

  async deleteOrder(id: string, user: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    await this.OrdersModel.findOneAndDelete({$and: [{_id: id}, {user}, {$or: [{state: "Completed"}, {state: "Rejected"}]}]});
    return "Success";
  }

  //? -> dashboard...

  async create(createOrderInput: CreateOrderInput) {
    const order = await this.OrdersModel.create({...createOrderInput, type: "Manual"});
    //TODO: send noti -> admins & driver? ...
    return order;
  }

  async findAll(limitEntity: LimitEntity) {
    const startIndex = (limitEntity.page) * limitEntity.limit;
    const total = await this.OrdersModel.countDocuments();
    const orders = await this.OrdersModel.find().sort({_id: -1}).limit(limitEntity.limit).skip(startIndex).populate([{path: "user", select: {name: 1, phoneNumber: 1, image: 1}}, {path: "restaurant", select: {title: 1, titleEN: 1, titleKR: 1}}]);
    return {data: orders, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findUserOrders(limitEntity: LimitEntity) {
    const startIndex = (limitEntity.page) * limitEntity.limit;
    const total = await this.OrdersModel.countDocuments({user: limitEntity.user});
    const orders: any = await this.OrdersModel.find({user: limitEntity.user}).sort({_id: -1}).limit(limitEntity.limit).skip(startIndex).populate("restaurant");
    for(const single of orders){
      if(single?.restaurant?.image) single.restaurant.image = this.awsService.getUrl(single.restaurant.image);
    }
    return {data: orders, pages: Math.ceil(total / limitEntity.limit)};
  }

  findOne(id: string) {
    return this.OrdersModel.findById(id);
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    await this.OrdersModel.findByIdAndUpdate(id, updateOrderInput);
    return "Success";
  }

  async state(stateInput: StateInput){
    await this.OrdersModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  async remove(id: string) {
    await this.OrdersModel.findByIdAndDelete(id);
    return "Success";
  }

  async home() {
    let week = { d0: 0, d1: 0, d2:0, d3: 0, d4: 0, d5: 0, d6:0 };
    let status = { Pending: 0, InProgress: 0, InDelivery: 0, Completed: 0, Canceled: 0 };
    const data = new Date().setDate(new Date().getDate() -7);
    const ordersInWeek = await this.OrdersModel.aggregate([
      {$match: {$and: [ {createdAt: {$gte: new Date(data)}}, {createdAt: {$lte: new Date()}} ] }},
      {$group: {_id: "createAt", total: {$push: {createdAt: "$createdAt", state: "$state"}},}},
    ]);
    //TODO: set getDay() to -> getDate()...
    if(ordersInWeek[0]?.total){
      for(const single of ordersInWeek[0]?.total){
        status = {...status, [single.state]: status[single.state] + 1};
        week = {...week, [`d${new Date(single.createdAt).getDay()}`]: week[`d${new Date(single.createdAt).getDay()}`] +1};
      }
    }
    const orders = await this.OrdersModel.countDocuments({state: "Completed"});
    const recentlyOrders: any= await this.OrdersModel.find().sort({_id: -1}).limit(10).populate([{path: "user", select: {name: 1, phoneNumber: 1, image: 1}}, {path: "restaurant", select: {title: 1, titleEN: 1, titleKR: 1}}]).select(["user", "restaurant", "price", "totalPrice", "state"]);
    for(const single of recentlyOrders){
      if(single?.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
    }
    const drivers = await this.driversService.home();
    const restaurants = await this.restaurantsService.home();
    const meals = await this.mealsService.home();
    const { recentlyRating, rating, total } = await this.ratesService.home();
    const { users, recentlyUsers } = await this.usersService.home();
    //* 2.58 s, 13.59 KB...
    return {orders, recentlyOrders, week, status, users, recentlyUsers, rating, total, recentlyRating, restaurants, meals, drivers};
  }

  async ordersReport(date: string){
    const year = new Date(date);
    let result = months;
    const orders = await this.OrdersModel.aggregate([
      {$match: {$and: [ {createdAt: {$gte: year}}, {createdAt: {$lte: new Date()}}, {state: "Completed"} ] }},
      {$group: {_id: "createAt", total: {$push: "$createdAt"},}},
    ]);
    for(const single of orders[0]?.total){
      result = {...result, [`m${new Date(single).getMonth()}`]: {...result[`m${new Date(single).getMonth()}`], [`d${new Date(single).getDate()}`]: result[`m${new Date(single).getMonth()}`][`d${new Date(single).getDate()}`]+1}}
    }
    return result;
  }

  async profitsReport(date: string){
    const year = new Date(date);
    let result = months;
    const orders = await this.OrdersModel.aggregate([
      {$match: {$and: [ {createdAt: {$gte: year}}, {createdAt: {$lte: new Date()}}, {state: "Completed"} ] }},
      {$group: {_id: "createAt", total: {$push: {createdAt: "$createdAt", price: "$price"}},}},
    ]);
    for(const single of orders[0]?.total){
      result = {...result, [`m${new Date(single?.createdAt).getMonth()}`]: {...result[`m${new Date(single?.createdAt).getMonth()}`], [`d${new Date(single?.createdAt).getDate()}`]: result[`m${new Date(single?.createdAt).getMonth()}`][`d${new Date(single?.createdAt).getDate()}`]+(single?.price ? single.price : 0)}}
    }
    return result;
  }

}