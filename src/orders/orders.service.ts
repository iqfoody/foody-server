import { BadRequestException, Inject, Injectable, NotAcceptableException, forwardRef } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
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
import { months } from 'src/constants/declearedMonths';
import { TransactionsService } from 'src/transactions/transactions.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel("Orders") private OrdersModel: Model<OrdersDocument>,
    @Inject(forwardRef(() => MealsService)) private mealsService: MealsService,
    @Inject(forwardRef(()=> PromoCodesService)) private readonly promoCodeService: PromoCodesService,
    @Inject(forwardRef(()=> WalletsService)) private readonly walletsService: WalletsService,
    @Inject(forwardRef(()=> UsersService)) private readonly usersService: UsersService,
    @Inject(forwardRef(()=> RatesService)) private readonly ratesService: RatesService,
    @Inject(forwardRef(()=> RestaurantsService)) private readonly restaurantsService: RestaurantsService,
    @Inject(forwardRef(()=> DriversService)) private readonly driversService: DriversService,
    @Inject(forwardRef(()=> TransactionsService)) private readonly transactionsService: TransactionsService,
    @Inject(forwardRef(()=> NotificationsService)) private readonly notificationsService: NotificationsService,
    private readonly awsService: AwsService
  ) {}

  //? -> application...

  async createOrder(createOrderInput: CreateOrderInput) {
    // -> check if user has an order not compeleted yet...
    if(!isValidObjectId(createOrderInput?.address) || !isValidObjectId(createOrderInput?.restaurant)) throw new BadRequestException("There isn't address orrestaurant with this id");
    if(createOrderInput.meals?.length === 0) throw new BadRequestException("Please select meal to make order");
    const { _id } = await this.usersService.findId(createOrderInput.user);
    const ActiveOrder = await this.OrdersModel.findOne({$and: [{user: _id}, {restaurant: createOrderInput.restaurant}, {$and: [{state: {$ne: "Completed"}}, {state: {$ne: "Deleted"}}, {state: {$ne: "Canceled"}}]}]}, {_id:  1});
    if(ActiveOrder) throw new BadRequestException("you have order in ordered.");

    const restaurant = await this.restaurantsService.findRestaurant(createOrderInput.restaurant);
    if(!restaurant) throw new BadRequestException("There isn't restaurant with this restaruant id");

    let demoOrderDate :any = {...createOrderInput, user: _id, type: "Auto"};

    // -> get meals data & calculate total price...
    let totalPrice: number = 0;
    let totalPoints: number = 0;
    let pointsBack: number = 0;
    let price: number = 0;
    let priceAdditions: number = 0;
    let priceAfterDiscount: number = 0;
    let totalDiscount: number = 0;
    let transaction = {
      user: _id,
      amount: 0
    };
    let usePromoCode: boolean = false;
    let discount: number = restaurant?.discount || 0;
    let minDiscount: number = restaurant?.minDiscount || 0;
    let maxDiscount: number = restaurant?.maxDiscount || 0;
    const deliveryPrice: number = restaurant?.deliveryPrice || 0;

    for(const single of createOrderInput.meals){
      let additions = [];
      let addIngredients = [];
      let removeIngredients = [];
      const meal = await this.mealsService.findExtention(single.meal, createOrderInput?.restaurant);
      if(!meal) throw new BadRequestException("can't create order with meals isn't in this restaurant")
      price += meal.price * single.quantity;
      totalPoints += (meal.points * meal.price) * single.quantity;
      pointsBack += ((meal.pointsBack / 100) * meal.price) * single.quantity;

      if(meal.discount > 0){
        priceAfterDiscount += (meal.price * (meal.discount/100)) * single.quantity;
      }
      // -> check if ! payment with point calculate additions & ingredients...
      
              // -> get addition object & injected to order...
              if(single?.additions){
                for(const addition of single.additions){
                  const value: any = meal?.additions?.find((val: any) => val._id == addition);
                  if(value) {
                    const item = additions?.find(res => res?.addition?._id === value?._id);
                    if(item){
                      item.quantity = item.quantity + 1;
                      additions = additions?.map(res => res.addition === item.addition._id ? item : res);
                    } else {
                      additions = [...additions, {addition: value, quantity: 1}];
                    }
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

    if(discount > 0 && totalPrice >= minDiscount){
      if(maxDiscount === 0 || totalPrice < maxDiscount){
        totalPrice += -(totalPrice * (discount/100));
        totalDiscount += (totalPrice * (discount/100));
      } else
      if(totalPrice > maxDiscount){
        totalPrice += -maxDiscount;
        totalDiscount += maxDiscount;
      }
    } else if(priceAfterDiscount > 0) {
      totalPrice += -priceAfterDiscount;
      totalDiscount += priceAfterDiscount;
    }

    // -> sync promo code if exist...
    if(createOrderInput?.promoCode && createOrderInput?.paymentMethod !== "Points"){
      const promoCode :any = await this.promoCodeService.check(createOrderInput.promoCode, _id);
      if(!promoCode?.name) throw new BadRequestException("You can't use promo code dosn't exist")
      usePromoCode = true;
      if(promoCode.type === 'Price') {
        totalPrice += -promoCode.discount;
        if(totalPrice < 0) totalPrice = 0;
        demoOrderDate = {...demoOrderDate, discountType: "Price", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name};
        let precentValue = (price / promoCode.discount) / 100;
        pointsBack += - (pointsBack * precentValue);
        
      }
      if(promoCode.type === 'Percent') {
        totalPrice += - totalPrice * (promoCode.discount/100);
        if(totalPrice < 0) totalPrice = 0;
        demoOrderDate = {...demoOrderDate, discountType: "Percent", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name};
        pointsBack += - (pointsBack * (promoCode.discount / 100));
      }; 
    }

    // -> restaurnat delivery price...
    price += deliveryPrice;
    totalPrice += deliveryPrice;

    // -> sync wallet with order...
    const wallet = await this.walletsService.findUserWallet(_id);
    demoOrderDate = {...demoOrderDate, walletPoints: wallet.points};
    if(createOrderInput?.paymentMethod !== 'Cash'){
      if(wallet?.amount && createOrderInput?.paymentMethod === 'Wallet'){
        demoOrderDate = {...demoOrderDate, walletAmount: wallet.amount};
        // -> reset amount wallet...
        if(wallet.amount >= totalPrice){
          transaction = {...transaction, amount: totalPrice};
          totalPrice = 0;
        } else if(wallet?.amount > 0) {
          totalPrice += -wallet.amount;
          transaction = {...transaction, amount: wallet.amount};
        } else {
          createOrderInput = {...createOrderInput, paymentMethod: "Cash"}
        }
        
      } else if(wallet?.points && createOrderInput?.paymentMethod === 'Points'){
        // -> reset points wallet...
        if(totalPoints > wallet.points) throw new BadRequestException("your points is'nt enough");
        if(wallet.points >= totalPoints){
          transaction = {...transaction, amount: totalPoints};
          totalPrice = deliveryPrice;
        }
        
        // -> add total points to order...
        demoOrderDate = {...demoOrderDate, totalPoints}
      }
    }

    // -> get orders length...
    const no = await this.OrdersModel.countDocuments();

    // -> creating order...
    const order = await this.OrdersModel.create({...demoOrderDate, totalPrice, price, state: "Pending", discount, deliveryPrice, pointsBack, no, totalDiscount});
    if(!order) throw new BadRequestException("you order haven't created please try again later");
    if(usePromoCode && createOrderInput?.paymentMethod !== "Points") await this.promoCodeService.usePromoCode(createOrderInput.promoCode, _id);
    if(createOrderInput?.paymentMethod === "Wallet" && transaction.amount !== 0){
      await this.transactionsService.createTransaction({...transaction, order: order?._id, type: "Amount", procedure: "Minus", paymentMethod: "Wallet", state: "Pending", description: "payed for cost order" });
    } else if(createOrderInput?.paymentMethod === "Points" && transaction.amount !== 0){
      await this.transactionsService.createTransaction({...transaction, order: order?._id, type: "Points", procedure: "Minus", paymentMethod: "Points", state: "Pending", description: "payed for cost order points"});
    }
    await this.notificationsService.createVertual({user: _id, order: order._id, restaurant: createOrderInput.restaurant, type: "Management", title: "New order", titleEN: "New order", body: "you hane a new pending order", bodyEN: "you hane a new pending order"});
    return order;
  }

  async findOrders(phoneNumber: string, state?: orderStatus){
    const { _id } = await this.usersService.findId(phoneNumber);
    let orders = [];
    if(state && state === "Deleted") return;
    if(!state){
      orders = await this.OrdersModel.find({$and: [{user: _id}, {state: {$ne: "Deleted"}}]}).select(['-__v', '-updatedAt', '-type', '-user']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1} }, {path: "driver", select: {name: 1, phoneNumber: 1, image: 1}} ] );
    } else if(state) {
      orders = await this.OrdersModel.find({$and: [{user: _id}, {state}]}).select(['-__v', '-updatedAt', '-type', '-user']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1}}, {path: "driver", select: {name: 1, phoneNumber: 1, image: 1}} ] );
    }
    for(const order of orders){
      if(order?.restaurant?.image) order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
      if(order?.meals){
        for(const meal of order.meals){
          if(meal?.meal?.image) meal.meal.image = this.awsService.getUrl(meal.meal.image)
        }
      }
      if(order?.driver?.image) order.driver.image = this.awsService.getUrl(order.driver.image);
    }
    return orders;
  }

  async findOrdersDriver(phoneNumber: string, state?: orderStatus){
    const { _id } = await this.driversService.findId(phoneNumber);
    let orders = [];
    if(state && state === "Deleted") return;
    if(!state){
      orders = await this.OrdersModel.find({$and: [{driver: _id}, {state: {$ne: "Deleted"}}]}).select(['-__v', '-updatedAt', '-type']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1} }, {path: "user", select: {name: 1, phoneNumber: 1, image: 1}} ] );
    } else if(state) {
      orders = await this.OrdersModel.find({$and: [{driver: _id}, {state}]}).select(['-__v', '-updatedAt', '-type']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1}}, {path: "user", select: {name: 1, phoneNumber: 1, image: 1}} ] );
    }
    for(const order of orders){
      if(order?.restaurant?.image) order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
      if(order?.meals){
        for(const meal of order.meals){
          if(meal?.meal?.image) meal.meal.image = this.awsService.getUrl(meal.meal.image)
        }
      }
      if(order?.user?.image) order.user.image = this.awsService.getUrl(order.user.image);
    }
    return orders;
  }

  async findOrder(id: string, phoneNumber: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    const { _id } = await this.usersService.findId(phoneNumber);
    const order : any = await this.OrdersModel.findOne({$and: [{_id: id}, {user: _id}, {state: {$ne: "Deleted"}}]}).select(['-__v', '-updatedAt', '-type', '-user']).populate( [ {path: 'restaurant', select: {title: 1, titleEN: 1, titleKR: 1, image: 1}}, {path: "address", select: {title: 1, longitude: 1, latitude: 1, _id: 0}}, {path: "meals.meal", select: {title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1}} ] );
    if(order?.restaurant?.image) order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
    if(order?.meals){
      for(const meal of order.meals){
        if(meal?.meal?.image) meal.meal.image = this.awsService.getUrl(meal.meal.image)
      }
    }
    return order;
  }

    // -> this func. just for user & state = Pending...
  async cancelOrder(id: string, phoneNumber: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    const { _id } = await this.usersService.findId(phoneNumber);
    const order = await this.OrdersModel.findById(id);
    if(!order) throw new BadRequestException("Sorry, order not found");
    const updatedOrder = await this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {user: _id}, {state: "Pending"}]}, {state: "Canceled"});
    if(!updatedOrder) throw new BadRequestException("Sorry, you can't canceled this order");
    if(order?.paymentMethod !== "Cash") await this.transactionsService.cancelTransaction(order._id, _id);
    await this.notificationsService.createVertual({user: _id, order: order._id, restaurant: order.restaurant as string, type: "Management", title: "Canceled order", titleEN: "Canceled order", body: "Order has been canceled", bodyEN: "Order has been canceled"});
    return "Success";
  }

  // -> this func. just for driver & state = InDelivery...
  async inDeliveryOrder(id: string, phoneNumber: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    const { _id } = await this.driversService.findId(phoneNumber);
    const updatedOrder = await this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {driver: _id}, {state: "InProgress"}]}, {state: "InDelivery"});
    if(!updatedOrder) throw new BadRequestException("This order isn't in progress, make sure this order if an in progress state");
    //TODO: send in delivery order notification to user...
    return "Success";
  }

  // -> this func. just for driver & state = InDelivery...
  async completeOrder(id: string, phoneNumber: string, recievedPrice: number) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    const { _id } = await this.driversService.findId(phoneNumber);
    const order: any = await this.OrdersModel.findOne({$and: [{_id: id}, {driver: _id}, {state: "InDelivery"}]}, {totalPrice: 1, pointsBack: 1, user: 1, restaurant: 1});
    if(!order?._id || order?.totalPrice > recievedPrice) throw new NotAcceptableException("There isn't order for this action or recieved price isn't enough");
    await this.transactionsService.completeTransaction(order._id, _id);
    await this.OrdersModel.findByIdAndUpdate(order._id, {state: "Completed", recievedPrice});
    if(recievedPrice > order?.totalPrice){
      const amount = recievedPrice - order.totalPrice;
      // create user transaction...
      await this.transactionsService.createTransaction({user: order.user as string, amount, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash back from completed order recieved amount by driver"});
      // create driver transaction...
      await this.transactionsService.createTransaction({driver: _id, amount: recievedPrice, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash recieved from customer completed order"});
    }
    if (order.pointsBack > 0) await this.transactionsService.createTransaction({user: order.user as string, amount: order.pointsBack, order: order?._id, type: "Points", procedure: "Plus", paymentMethod: "Points", state: "Completed", description: "Points back from completed order"});
    //TODO: send rating notification to user...
    //TODO: send completed order notification to user...
    await this.notificationsService.sendPrivate({user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "طلبك مكتمل", titleEN: "Order completed", body: "تم اكمال طلبك بنجاح", bodyEN: "Your order is completed"});
    return "Success";
  }

  // -> rating restaurnt & update order...
  async rateOrder(createRateOrderInput: CreateRateOrderInput){
    const { user, order, rate, description } = createRateOrderInput;
    if(!order || !user || !rate) throw new BadRequestException("order & user & rate required");
    if(!isValidObjectId(order)) throw new BadRequestException("There isn't order with this id");
    const { _id } = await this.usersService.findId(user);
    const currentOrder :any = await this.OrdersModel.findOne({$and: [{_id: order}, {user: _id}, {hasRating: false}]});
    if(!currentOrder) throw new BadRequestException("you can't rate this order.");
    await this.OrdersModel.findByIdAndUpdate(currentOrder._id, {hasRating: true});
    const resultRate = await this.ratesService.rateResaurant({user: _id, rate, description, restaurant: currentOrder.restaurant});
    if(resultRate?.rates && resultRate?.rating) await this.restaurantsService.update(currentOrder.restaurant, {rates: resultRate.rates, rating: resultRate.rating});
    return "Success";
  }

  async deleteOrder(id: string, phoneNumber: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't order with this id");
    const { _id } = await this.usersService.findId(phoneNumber);
    const deleted = await this.OrdersModel.findOneAndUpdate({$and: [{_id: id}, {user: _id}, {$or: [{state: "Completed"}, {state: "Canceled"}]}]}, {state: "Deleted"});
    if(!deleted) throw new BadRequestException("You can't delete order isn't completed yet");
    return "Success";
  }

  //? -> dashboard...

  async create(createOrderInput: CreateOrderInput) {
    // -> check if user has an order not compeleted yet...
    if(!isValidObjectId(createOrderInput?.user) || !isValidObjectId(createOrderInput?.address) || !isValidObjectId(createOrderInput?.restaurant) || !isValidObjectId(createOrderInput?.driver)) throw new BadRequestException("There isn't user, address, restaurant or driver with this id");
    if(createOrderInput.meals?.length === 0) throw new BadRequestException("Please select meal to make order");
    const ActiveOrder = await this.OrdersModel.findOne({$and: [{user: createOrderInput.user}, {restaurant: createOrderInput.restaurant}, {$and: [{state: {$ne: "Completed"}}, {state: {$ne: "Deleted"}}, {state: {$ne: "Canceled"}}]}]}, {_id:  1});
    if(ActiveOrder) throw new BadRequestException("you have order in ordered");

    const restaurant = await this.restaurantsService.findRestaurant(createOrderInput.restaurant);
    if(!restaurant) throw new BadRequestException("There isn't restaurant with this restaruant id");

    let demoOrderDate :any = {...createOrderInput, type: "Manual"};

    // -> get meals data & calculate total price...
    let totalPrice: number = 0;
    let totalPoints: number = 0;
    let pointsBack: number = 0;
    let price: number = 0;
    let priceAdditions: number = 0;
    let priceAfterDiscount: number = 0;
    let totalDiscount: number = 0;
    let discount: number = restaurant?.discount || 0;
    let minDiscount: number = restaurant?.minDiscount || 0;
    let maxDiscount: number = restaurant?.maxDiscount || 0;
    let usePromoCode: boolean = false;
    const deliveryPrice: number = restaurant?.deliveryPrice || 0;

    for(const single of createOrderInput.meals){
      let additions = [];
      let addIngredients = [];
      let removeIngredients = [];
      const meal = await this.mealsService.findExtention(single.meal, createOrderInput?.restaurant);
      if(!meal) throw new BadRequestException("can't create order with meals isn't in this restaurant")
      price += meal.price * single.quantity;
      totalPoints += (meal.points * meal.price) * single.quantity;
      pointsBack += ((meal.pointsBack / 100) * meal.price) * single.quantity;

      if(meal.discount > 0){
        priceAfterDiscount += (meal.price * (meal.discount/100)) * single.quantity;
      }
      // -> check if ! payment with point calculate additions & ingredients...
      // -> get addition object & injected to order...
      if(single?.additions){
        for(const addition of single.additions){
          const value: any = meal?.additions?.find((val: any) => val._id == addition);
          if(value) {
            const item = additions?.find(res => res?.addition?._id === value?._id);
            if(item){
              item.quantity = item.quantity + 1;
              additions = additions?.map(res => res.addition === item.addition._id ? item : res);
            } else {
              additions = [...additions, {addition: value, quantity: 1}];
            }
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

    if(discount > 0 && totalPrice >= minDiscount){
      if(maxDiscount === 0 || totalPrice < maxDiscount){
        totalPrice += -(totalPrice * (discount/100));
        totalDiscount += (totalPrice * (discount/100));
      } else
      if(totalPrice >= maxDiscount){
        totalPrice += -maxDiscount;
        totalDiscount += maxDiscount;
      }
    } else if(priceAfterDiscount > 0) {
      totalPrice += -priceAfterDiscount;
      totalDiscount += priceAfterDiscount;
    }

    // -> sync promo code if exist...
    if(createOrderInput?.promoCode){
      const promoCode :any = await this.promoCodeService.checkPromoCode({name: createOrderInput.promoCode, user: createOrderInput.user});
      if(!promoCode?.name) throw new BadRequestException("You can't use promo code dosn't exist")
      usePromoCode = true;
      if(promoCode.type === 'Price') {
        totalPrice += -promoCode.discount;
        if(totalPrice < 0) totalPrice = 0;
        demoOrderDate = {...demoOrderDate, discountType: "Price", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name};
        let precentValue = (price / promoCode.discount) / 100;
        pointsBack += - (pointsBack * precentValue);
        
      } else
      if(promoCode.type === 'Percent') {
        totalPrice += - totalPrice * (promoCode.discount/100);
        if(totalPrice < 0) totalPrice = 0;
        demoOrderDate = {...demoOrderDate, discountType: "Percent", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name};
        pointsBack += - (pointsBack * (promoCode.discount / 100));
      }; 
    }

    // -> restaurnat delivery price...
    price += deliveryPrice;
    totalPrice += deliveryPrice;

    // -> sync wallet with order...
    const wallet = await this.walletsService.findUserWallet(createOrderInput.user);
    demoOrderDate = {...demoOrderDate, walletPoints: wallet.points};

    // -> get orders length...
    const no = await this.OrdersModel.countDocuments();

    // -> creating order...
    const order = await this.OrdersModel.create({...demoOrderDate, totalPrice, price, state: "Pending", discount, deliveryPrice, pointsBack, no, totalDiscount});
    if(!order) throw new BadRequestException("you order haven't created please try again later");
    if(usePromoCode) await this.promoCodeService.usePromoCode(createOrderInput.promoCode, createOrderInput.user);
    const finalOrder: any = await order.populate([{path: "user", select: {name: 1, phoneNumber: 1, image: 1}}, {path: "restaurant", select: {title: 1, titleEN: 1, titleKR: 1}}]);
    if(finalOrder?.user?.image) finalOrder.user.image = this.awsService.getUrl(finalOrder.user.image);
    //TODO: send noti -> user & driver? ...
    return finalOrder;
  }

  async findAll(limitEntity: LimitEntity) {
    let readed: boolean = true;
    const startIndex = (limitEntity.page) * limitEntity.limit;
    const total = await this.OrdersModel.countDocuments();
    const orders: any = await this.OrdersModel.find().sort({_id: -1}).limit(limitEntity.limit).skip(startIndex).populate([{path: "user", select: {name: 1, phoneNumber: 1, image: 1}}, {path: "restaurant", select: {title: 1, titleEN: 1, titleKR: 1}}]);
    for(const order of orders){
      if(order?.user?.image) order.user.image = this.awsService.getUrl(order.user.image);
      if(!order?.readed) readed = false;
    }
    if(!readed) await this.OrdersModel.updateMany({readed: false}, {readed: true});
    return {data: orders, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findUserOrders(limitEntity: LimitEntity) {
    const startIndex = (limitEntity.page) * limitEntity.limit;
    const total = await this.OrdersModel.countDocuments({user: limitEntity.user});
    const orders: any = await this.OrdersModel.find({user: limitEntity.user}).sort({_id: -1}).limit(limitEntity.limit).skip(startIndex).populate({path: "restaurant", select: {title: 1, titleEN: 1, titleKR: 1, image: 1}});
    for(const single of orders){
      if(single?.restaurant?.image) single.restaurant.image = this.awsService.getUrl(single.restaurant.image);
    }
    return {data: orders, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findDriverOrders(limitEntity: LimitEntity) {
    const startIndex = (limitEntity.page) * limitEntity.limit;
    const total = await this.OrdersModel.countDocuments({driver: limitEntity.user});
    const orders: any = await this.OrdersModel.find({driver: limitEntity.user}).sort({_id: -1}).limit(limitEntity.limit).skip(startIndex).populate({path: "restaurant", select: {title: 1, titleEN: 1, titleKR: 1, image: 1}});
    for(const single of orders){
      if(single?.restaurant?.image) single.restaurant.image = this.awsService.getUrl(single.restaurant.image);
    }
    return {data: orders, pages: Math.ceil(total / limitEntity.limit)};
  }

  async findOne(id: string) {
    const order: any = await this.OrdersModel.findById(id).populate([{path: "user", select: {name: 1, phoneNumber: 1, image: 1}}, {path: "restaurant", select: {title: 1, titleEN: 1, titleKR: 1, image: 1, discount: 1, minDiscount: 1, maxDiscount: 1 }}, {path: "address", select: {_id: 1}}, {path: "meals.meal"}, {path: "driver", select:{name: 1, phoneNumber: 1, image: 1}} ]);
    if(order?.user?.image) order.user.image = this.awsService.getUrl(order.user.image);
    if(order?.restaurant?.image) order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
    return order;
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
     // -> check if user has an order not compeleted yet...
     if(!isValidObjectId(updateOrderInput?.address) || !isValidObjectId(updateOrderInput?.driver) || !isValidObjectId(id)) throw new BadRequestException("There isn't user, address, restaurant or driver with this id");
     if(updateOrderInput.meals?.length === 0) throw new BadRequestException("Please select meal to make order");
     const order: any = await this.OrdersModel.findById(id);

     const restaurant = await this.restaurantsService.findRestaurant(order.restaurant);
     if(!restaurant) throw new BadRequestException("There isn't restaurant with this restaruant id");

     let demoOrderDate :any = updateOrderInput;

     // -> get meals data & calculate total price...
     let totalPrice: number = 0;
     let totalPoints: number = 0;
     let pointsBack: number = 0;
     let price: number = 0;
     let priceAdditions: number = 0;
     let priceAfterDiscount: number = 0;
     let totalDiscount: number = 0;
     let discount: number = restaurant?.discount || 0;
     let minDiscount: number = restaurant?.minDiscount || 0;
     let maxDiscount: number = restaurant?.maxDiscount || 0;
     const deliveryPrice: number = restaurant?.deliveryPrice || 0;
     let transaction = {
      user: order.user,
      amount: 0
    };
 
     for(const single of updateOrderInput.meals){
       let additions = [];
       let addIngredients = [];
       let removeIngredients = [];
       const meal = await this.mealsService.findExtention(single.meal, order.restaurant);
       if(!meal) throw new BadRequestException("can't update order with meals isn't in this restaurant")
       price += meal.price * single.quantity;
       totalPoints += (meal.points * meal.price) * single.quantity;
       pointsBack += ((meal.pointsBack / 100) * meal.price) * single.quantity;
 
       if(meal.discount > 0){
        priceAfterDiscount += (meal.price * (meal.discount/100)) * single.quantity;
       }
       // -> check if ! payment with point calculate additions & ingredients...
       // -> get addition object & injected to order...
       if(single?.additions){
         for(const addition of single.additions){
           const value: any = meal?.additions?.find((val: any) => val._id == addition);
           if(value) {
             const item = additions?.find(res => res?.addition?._id === value?._id);
             if(item){
               item.quantity = item.quantity + 1;
               additions = additions?.map(res => res.addition === item.addition._id ? item : res);
             } else {
               additions = [...additions, {addition: value, quantity: 1}];
             }
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

     if(discount > 0 && totalPrice >= minDiscount){
      if(maxDiscount === 0 || totalPrice < maxDiscount){
        totalPrice += -(totalPrice * (discount/100));
        totalDiscount += (totalPrice * (discount/100));
      } else
      if(totalPrice >= maxDiscount){
        totalPrice += -maxDiscount;
        totalDiscount += maxDiscount;
      }
    } else if(priceAfterDiscount > 0) {
      totalPrice += -priceAfterDiscount;
      totalDiscount += priceAfterDiscount;
    }

     // -> check if there is promo code...
     if(order?.promoCode){
      const promoCodeType = order.promoCodeDiscount <= 100 ? "Percent" : "Price";
      if(promoCodeType === 'Price') {
        totalPrice += -order.promoCodeDiscount;
        if(totalPrice < 0) totalPrice = 0;
        let precentValue = (price / order.promoCodeDiscount) / 100;
        pointsBack += - (pointsBack * precentValue);
        
      } else
      if(promoCodeType === 'Percent') {
        totalPrice += - totalPrice * (order.promoCodeDiscount/100);
        if(totalPrice < 0) totalPrice = 0;
        pointsBack += - (pointsBack * (order.promoCodeDiscount / 100));
      }; 
     }

    // -> restaurnat delivery price...
    price += deliveryPrice;
    totalPrice += deliveryPrice;

     // -> sync wallet with order...
     if(order?.paymentMethod !== 'Cash'){
      if(order?.walletAmount && order?.paymentMethod === 'Wallet'){
        // -> reset amount wallet...
        if(order?.walletAmount >= totalPrice){
          transaction = {...transaction, amount: totalPrice};
          totalPrice = 0;
        } else if(order?.walletAmount > 0) {
          totalPrice += -order?.walletAmount;
          transaction = {...transaction, amount: order?.walletAmount};
        } else {
          demoOrderDate = {...demoOrderDate, paymentMethod: "Cash"}
        }
        
      } else if(order?.walletPoints && order?.paymentMethod === 'Points'){
        // -> reset points wallet...
        if(totalPoints > order?.walletPoints) throw new BadRequestException("your points is'nt enough");
        if(order?.walletPoints >= totalPoints){
          transaction = {...transaction, amount: totalPoints};
          totalPrice = deliveryPrice;
        }
        
        // -> add total points to order...
        demoOrderDate = {...demoOrderDate, totalPoints}
      }
    }

 
     // -> updating order...
     const updatedOrder = await this.OrdersModel.findByIdAndUpdate(id, {...demoOrderDate, totalPrice, price, pointsBack, discount, totalDiscount});
     if(!updatedOrder) throw new BadRequestException("you order haven't updated please try again later");

     // -> send notification to driver...
     if(updateOrderInput?.driver) await this.notificationsService.sendPrivate({driver: order.driver, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تعديل الطلب", titleEN: "Order updated", body: "تم تعديل طلبك", bodyEN: "Your order has been updated"});
     // -> send notification to user...
     await this.notificationsService.sendPrivate({user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تعديل الطلب", titleEN: "Order updated", body: "تم تعديل طلبك", bodyEN: "Your order has been updated"});
     //? if use wallet...
     if(updateOrderInput?.paymentMethod !== "Cash" && transaction.amount !== 0){
      await this.transactionsService.updateTransaction({...transaction, order: order._id});
     }
    return this.findOne(id);
  }

  async state(stateInput: StateInput){
    const order: any = await this.OrdersModel.findById(stateInput.id);
    if(stateInput.state === "Pending"){
      // -> send noti -> user...
      await this.notificationsService.sendPrivate({user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تغيير حالة الطلب", titleEN: "Order changed status", body: "طلبك قيد الانتظار", bodyEN: "Your order is pending"});
    } else if(stateInput.state === "InProgress"){
      // -> send noti -> user...
      await this.notificationsService.sendPrivate({user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تغيير حالة الطلب", titleEN: "Order changed status", body: "طلبك قيد التحضير", bodyEN: "Your order is in progress"});
    } else if(stateInput.state === "InDelivery") {
      // -> send noti -> user, driver...
      if(order?.driver) await this.notificationsService.sendPrivate({driver: order.driver, order: order._id, restaurant: order.restaurant, type: "Private", title: "لديك طلب جديد", titleEN: "New order", body: "تم اضافة طلب جديد لديك", bodyEN: "You have new order"});
      await this.notificationsService.sendPrivate({user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تغيير حالة الطلب", titleEN: "Order changed status", body: "طلبك قيد التوصيل", bodyEN: "Your order is in delivery"});
    } else if(stateInput.state === "Completed"){
      // -> send noti -> user...
      await this.notificationsService.sendPrivate({user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تغيير حالة الطلب", titleEN: "Order changed status", body: "طلبك مكتمل", bodyEN: "Your order is completed"});
      if(order?.paymentMethod !== "Cash") await this.transactionsService.completeTransaction(order._id, order.user);
    } else if(stateInput.state === "Canceled"){
      // -> send noti -> user, driver...
      await this.notificationsService.sendPrivate({user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تغيير حالة الطلب", titleEN: "Order changed status", body: "تم الغاء طلبك", bodyEN: "Your order is canceled"});
      if(order?.paymentMethod !== "Cash") await this.transactionsService.cancelTransaction(order._id, order.user);
    }
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
      {$match: {createdAt: {$gt: new Date(data)}} },
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
    const transactions = await this.transactionsService.home();
    //* 2.58 s, 13.59 KB...
    return {orders, recentlyOrders, week, status, users, recentlyUsers, rating, total, recentlyRating, restaurants, meals, drivers, transactions};
  }

  async ordersReport(date: string){
    const year = new Date(date);
    let result = months;
    const orders = await this.OrdersModel.aggregate([
      {$match: {$and: [ {createdAt: {$gte: year}}, {createdAt: {$lte: new Date()}}, {state: "Completed"} ] }},
      {$group: {_id: "createAt", total: {$push: "$createdAt"},}},
    ]);
    if(orders?.length){
      for(const single of orders[0]?.total){
        result = {...result, [`m${new Date(single).getMonth()}`]: {...result[`m${new Date(single).getMonth()}`], [`d${new Date(single).getDate()}`]: result[`m${new Date(single).getMonth()}`][`d${new Date(single).getDate()}`]+1}}
      }
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
    if(orders?.length){
      for(const single of orders[0]?.total){
        result = {...result, [`m${new Date(single?.createdAt).getMonth()}`]: {...result[`m${new Date(single?.createdAt).getMonth()}`], [`d${new Date(single?.createdAt).getDate()}`]: result[`m${new Date(single?.createdAt).getMonth()}`][`d${new Date(single?.createdAt).getDate()}`]+(single?.price ? single.price : 0)}}
      }
    }
    return result;
  }

  async findUnread() {
    return this.OrdersModel.countDocuments({readed: false});
  }

}