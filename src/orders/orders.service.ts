import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const order = await this.OrdersModel.create({...createOrderInput, type: "Manual"});
    //TODO: send noti -> admins & driver? ...
    return order;
  }

  async createOrder(createOrderInput: CreateOrderInput) {
    // -> check if user has an order not compeleted yet...
    const checkIfHasOrderActive = await this.OrdersModel.findOne({$and: [{user: createOrderInput.user}, {$and: [{state: {$ne: "Completed"}}, {state: {$ne: "Deleted"}}]}]}, {_id:  1});
    if(checkIfHasOrderActive) throw new BadRequestException("you have order in ordered.");

    let demoOrderDate :any = {...createOrderInput, type: "Auto"};

    // -> get meals data & calculate total price...
    let totalPrice = 0;
    let totalPoints = 0;
    let price = 0;
    let priceAdditions = 0;

    // -> restaurnat delivery price...
    const { deliveryPrice } = await this.restaurantsService.getDeliveryPrice(createOrderInput.restaurant);
    price += deliveryPrice;

    for(const single of createOrderInput.meals){
      let additions = [];
      let addIngredients = [];
      let removeIngredients = [];
      const meal = await this.mealsService.findExtention(single.meal);
      price += meal.price * single.quantity;
      totalPoints += meal.points * single.quantity;
      // -> check if ! payment with point calculate additions & ingredients...
      
              // -> get addition object & injected to order...
              if(single?.additions){
                for(const addition of single.additions){
                  const value = meal?.additions?.find((val: any) => val._id == addition);
                  if(value) {
                    additions = [...additions, value];
                    price += value.price;
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
    totalPrice += price + deliveryPrice;

    // -> sync promo code if exist...
    if(createOrderInput?.promoCode && createOrderInput?.paymentMethod !== "Points"){
      const promoCode :any = await this.promoCodeService.check(createOrderInput.promoCode, createOrderInput.user);
      await this.promoCodeService.usePromoCode(createOrderInput.promoCode, createOrderInput.user);
      if(promoCode.type === 'Price') {
        totalPrice += -promoCode.discount;
        demoOrderDate = {...demoOrderDate, discountType: "Price", discount: promoCode.discount, promoCode: promoCode.name};
      }
      if(promoCode.type === 'Percent') {
        totalPrice += - totalPrice * (promoCode.discount/100);
        demoOrderDate = {...demoOrderDate, discountType: "Percent", discount: promoCode.discount, promoCode: promoCode.name}
      }; 
    }

    // -> sync wallet with order...
    if(createOrderInput?.paymentMethod !== 'Cash'){
      const user :any = await this.usersService.findWallet(createOrderInput.user)
      const wallet = await this.walletsService.findOne(user.wallet);
      if(wallet?.amount && createOrderInput?.paymentMethod === 'Wallet'){
        demoOrderDate = {...demoOrderDate, walletAmount: wallet.amount}
        // -> reset amount wallet...
        if(wallet.amount >= totalPrice){
          const newAmount = wallet.amount - totalPrice;
          await this.walletsService.update(wallet._id, {amount: newAmount});
          totalPrice = 0;
        } else {
          totalPrice += -wallet.amount;
          console.log(totalPrice, wallet.amount)
          await this.walletsService.update(wallet._id, {amount: 0});
        }
        
      } else if(wallet?.points && createOrderInput?.paymentMethod === 'Points'){
        demoOrderDate = {...demoOrderDate, walletPoints: wallet.points};
        console.log(totalPoints, wallet.points)
        // -> reset points wallet...
        if(totalPoints > wallet.points) throw new BadRequestException("your points is'nt enough");
        if(wallet.points >= totalPoints){
          const newPoints = wallet.points - totalPoints;
          await this.walletsService.update(wallet._id, {points: newPoints});
          totalPrice = deliveryPrice + priceAdditions;
        }
        
        // -> add total points to order...
        demoOrderDate = {...demoOrderDate, totalPoints}
      }

    }

    //TODO: return points back to wallet points user...

    // -> creating order...
    const order = await this.OrdersModel.create({...demoOrderDate, totalPrice, price, state: "Completed", deliveryPrice});
    //TODO: send noti -> admins & driver? ...
    return order;
  }

  async findAll(limitEntity: LimitEntity) {
    const startIndex = (limitEntity.page) * limitEntity.limit;
    const total = await this.OrdersModel.find().countDocuments({});
    const orders = await this.OrdersModel.find().sort({_id: -1}).limit(limitEntity.limit).skip(startIndex);
    return {data: orders, page: Math.ceil(total / limitEntity.limit)};
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

  findOne(id: string) {
    return this.OrdersModel.findById(id);
  }

  async findOrder(id: string, user: string) {
    const order : any = await this.OrdersModel.findOne({$and: [{_id: id}, {user}, {state: {$ne: "Deleted"}}]}).select(['-__v', '-updatedAt', '-type', '-user']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1}} ] );
    if(order?.restaurant?.image) order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
    if(order?.meals){
      for(const meal of order.meals){
        if(meal?.meal?.image) meal.meal.image = this.awsService.getUrl(meal.meal.image)
      }
    }
    return order;
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    await this.OrdersModel.findByIdAndUpdate(id, updateOrderInput);
    return "Success";
  }

  async state(stateInput: StateInput){
    await this.OrdersModel.findByIdAndUpdate(stateInput.id, stateInput);
    return "Success";
  }

  // -> this func. just for user & state = Pending...
  cancelOrder(id: string, user: string) {
    return this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {user}, {state: "Pending"}]}, {state: "Canceled"});
  }

  // -> this func. just for driver & state = InDelivery...
  inDeliveryOrder(id: string, driver: string) {
    return this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {driver}, {state: "InProgress"}]}, {state: "InDelivery"});
  }

  // -> this func. just for driver & state = InDelivery...
  completeOrder(id: string, driver: string, recievedPrice: number) {
    //TODO: send rating notification to user...
    return this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {driver}, {state: "InDelivery"}]}, {state: "Completed", recievedPrice});
  }

  // -> rating restaurnt & update order...
  async rateOrder(createRateOrderInput: CreateRateOrderInput){
    const { user, order, rate, description } = createRateOrderInput;
    if(!order || !user || !rate) throw new BadRequestException("order & user & rate required");
    const currentOrder :any = await this.OrdersModel.findOne({$and: [{_id: order}, {user}, {hasRating: false}]});
    if(!currentOrder) throw new BadRequestException("you can't rate this order.");
    await this.OrdersModel.findByIdAndUpdate(currentOrder._id, {hasRating: true});
    const resultRate = await this.ratesService.rateResaurant({user, rate, description, restaurant: currentOrder.restaurant});
    if(resultRate?.rates && resultRate?.rating) await this.restaurantsService.update(currentOrder.restaurant, {rates: resultRate.rates, rating: resultRate.rating});
    return "Success";
  }

  async deleteOrder(id: string, user: string) {
    await this.OrdersModel.findOneAndDelete({$and: [{_id: id}, {user}, {$or: [{state: "Completed"}, {state: "Rejected"}]}]});
    return "Success";
  }

  async remove(id: string) {
    await this.OrdersModel.findByIdAndDelete(id);
    return "Success";
  }
}