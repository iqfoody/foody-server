"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meals_service_1 = require("../meals/meals.service");
const aws_service_1 = require("../aws/aws.service");
const promo_codes_service_1 = require("../promo-codes/promo-codes.service");
const wallets_service_1 = require("../wallets/wallets.service");
const users_service_1 = require("../users/users.service");
const rates_service_1 = require("../rates/rates.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const drivers_service_1 = require("../drivers/drivers.service");
const declearedMonths_1 = require("../constants/declearedMonths");
const transactions_service_1 = require("../transactions/transactions.service");
let OrdersService = class OrdersService {
    OrdersModel;
    mealsService;
    promoCodeService;
    walletsService;
    usersService;
    ratesService;
    restaurantsService;
    driversService;
    transactionsService;
    awsService;
    constructor(OrdersModel, mealsService, promoCodeService, walletsService, usersService, ratesService, restaurantsService, driversService, transactionsService, awsService) {
        this.OrdersModel = OrdersModel;
        this.mealsService = mealsService;
        this.promoCodeService = promoCodeService;
        this.walletsService = walletsService;
        this.usersService = usersService;
        this.ratesService = ratesService;
        this.restaurantsService = restaurantsService;
        this.driversService = driversService;
        this.transactionsService = transactionsService;
        this.awsService = awsService;
    }
    async createOrder(createOrderInput) {
        if (!(0, mongoose_2.isValidObjectId)(createOrderInput?.user) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.address) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.restaurant))
            throw new common_1.BadRequestException("There isn't user or restaurant with this id");
        if (createOrderInput.meals?.length === 0)
            throw new common_1.BadRequestException("Please select meal to make order");
        const ActiveOrder = await this.OrdersModel.findOne({ $and: [{ user: createOrderInput.user }, { restaurant: createOrderInput.restaurant }, { $and: [{ state: { $ne: "Completed" } }, { state: { $ne: "Deleted" } }, { state: { $ne: "Canceled" } }] }] }, { _id: 1 });
        if (ActiveOrder)
            throw new common_1.BadRequestException("you have order in ordered.");
        let demoOrderDate = { ...createOrderInput, type: "Auto" };
        let totalPrice = 0;
        let totalPoints = 0;
        let pointsBack = 0;
        let price = 0;
        let priceAdditions = 0;
        let transaction = {
            user: createOrderInput.user,
            amount: 0
        };
        let usePromoCode = false;
        const { deliveryPrice } = await this.restaurantsService.getDeliveryPrice(createOrderInput.restaurant);
        price += deliveryPrice;
        for (const single of createOrderInput.meals) {
            let additions = [];
            let addIngredients = [];
            let removeIngredients = [];
            const meal = await this.mealsService.findExtention(single.meal, createOrderInput?.restaurant);
            if (!meal)
                throw new common_1.BadRequestException("can't create order with meals isn't in this restaurant");
            price += meal.price * single.quantity;
            totalPoints += (meal.points * meal.price) * single.quantity;
            pointsBack += ((meal.pointsBack / 100) * meal.price) * single.quantity;
            if (single?.additions) {
                for (const addition of single.additions) {
                    const value = meal?.additions?.find((val) => val._id == addition);
                    if (value) {
                        additions = [...additions, value];
                        price += value.price;
                        totalPoints += (meal.points * value.price);
                        pointsBack += (meal.pointsBack / 100) * value.price;
                        priceAdditions += value.price;
                    }
                }
            }
            if (single?.addIngredients) {
                for (const addIngredient of single.addIngredients) {
                    const value = meal?.ingredients?.find((val) => val._id == addIngredient);
                    if (value)
                        addIngredients = [...addIngredients, value];
                }
            }
            if (single?.removeIngredients) {
                for (const removeIngredient of single.removeIngredients) {
                    const value = meal?.ingredients?.find((val) => val._id == removeIngredient);
                    if (value)
                        removeIngredients = [...removeIngredients, value];
                }
            }
            single.additions = additions;
            single.addIngredients = addIngredients;
            single.removeIngredients = removeIngredients;
        }
        totalPrice += price;
        if (createOrderInput?.promoCode && createOrderInput?.paymentMethod !== "Points") {
            const promoCode = await this.promoCodeService.check(createOrderInput.promoCode, createOrderInput.user);
            if (!promoCode?.name)
                throw new common_1.BadRequestException("You can't use promo code dosn't exist");
            usePromoCode = true;
            if (promoCode.type === 'Price') {
                totalPrice += -promoCode.discount;
                demoOrderDate = { ...demoOrderDate, discountType: "Price", discount: promoCode.discount, promoCode: promoCode.name };
                let precentValue = (price / promoCode.discount) / 100;
                pointsBack += -(pointsBack * precentValue);
            }
            if (promoCode.type === 'Percent') {
                totalPrice += -totalPrice * (promoCode.discount / 100);
                demoOrderDate = { ...demoOrderDate, discountType: "Percent", discount: promoCode.discount, promoCode: promoCode.name };
                pointsBack += -(pointsBack * (promoCode.discount / 100));
            }
            ;
        }
        const wallet = await this.walletsService.findUserWallet(createOrderInput.user);
        demoOrderDate = { ...demoOrderDate, walletPoints: wallet.points };
        if (createOrderInput?.paymentMethod !== 'Cash') {
            if (wallet?.amount && createOrderInput?.paymentMethod === 'Wallet') {
                demoOrderDate = { ...demoOrderDate, walletAmount: wallet.amount };
                if (wallet.amount >= totalPrice) {
                    transaction = { ...transaction, amount: totalPrice };
                    totalPrice = 0;
                }
                else if (wallet?.amount > 0) {
                    totalPrice += -wallet.amount;
                    transaction = { ...transaction, amount: wallet.amount };
                }
                else {
                    createOrderInput = { ...createOrderInput, paymentMethod: "Cash" };
                }
            }
            else if (wallet?.points && createOrderInput?.paymentMethod === 'Points') {
                if (totalPoints > wallet.points)
                    throw new common_1.BadRequestException("your points is'nt enough");
                if (wallet.points >= totalPoints) {
                    transaction = { ...transaction, amount: totalPoints };
                    totalPrice = deliveryPrice;
                }
                demoOrderDate = { ...demoOrderDate, totalPoints };
            }
        }
        const order = await this.OrdersModel.create({ ...demoOrderDate, totalPrice, price, state: "InDelivery", deliveryPrice, pointsBack });
        if (!order)
            throw new common_1.BadRequestException("you order haven't created please try again later");
        if (usePromoCode && createOrderInput?.paymentMethod !== "Points")
            await this.promoCodeService.usePromoCode(createOrderInput.promoCode, createOrderInput.user);
        if (createOrderInput?.paymentMethod === "Wallet" && transaction.amount !== 0) {
            await this.transactionsService.createTransaction({ ...transaction, order: order?._id, type: "Amount", procedure: "Minus", paymentMethod: "Wallet", state: "Completed", description: "payed for cost order" });
        }
        else if (createOrderInput?.paymentMethod === "Points" && transaction.amount !== 0) {
            await this.transactionsService.createTransaction({ ...transaction, order: order?._id, type: "Points", procedure: "Minus", paymentMethod: "Points", state: "Completed", description: "payed for cost order points" });
        }
        return order;
    }
    async findOrders(user, state) {
        let orders = [];
        if (state && state === "Deleted")
            return;
        if (!state) {
            orders = await this.OrdersModel.find({ $and: [{ user }, { state: { $ne: "Deleted" } }] }).select(['-__v', '-updatedAt', '-type', '-user']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }]);
        }
        else if (state) {
            orders = await this.OrdersModel.find({ $and: [{ user }, { state }] }).select(['-__v', '-updatedAt', '-type', '-user']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }]);
        }
        for (const order of orders) {
            if (order?.restaurant?.image)
                order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
            if (order?.meals) {
                for (const meal of order.meals) {
                    if (meal?.meal?.image)
                        meal.meal.image = this.awsService.getUrl(meal.meal.image);
                }
            }
        }
        return orders;
    }
    async findOrder(id, user) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        const order = await this.OrdersModel.findOne({ $and: [{ _id: id }, { user }, { state: { $ne: "Deleted" } }] }).select(['-__v', '-updatedAt', '-type', '-user']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }]);
        if (order?.restaurant?.image)
            order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
        if (order?.meals) {
            for (const meal of order.meals) {
                if (meal?.meal?.image)
                    meal.meal.image = this.awsService.getUrl(meal.meal.image);
            }
        }
        return order;
    }
    async cancelOrder(id, user) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        await this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { user }, { state: "Pending" }] }, { state: "Canceled" });
        return "Success";
    }
    inDeliveryOrder(id, driver) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        return this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { driver }, { state: "InProgress" }] }, { state: "InDelivery" });
    }
    async completeOrder(id, driver, recievedPrice) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        const order = await this.OrdersModel.findOne({ $and: [{ _id: id }, { driver }, { state: "InDelivery" }] }, { totalPrice: 1, pointsBack: 1, user: 1 });
        if (!order || order?.totalPrice > recievedPrice)
            throw new common_1.NotAcceptableException("There isn't order for this action or recieved price isn't enough");
        await this.OrdersModel.findByIdAndUpdate(order._id, { state: "Completed", recievedPrice });
        if (recievedPrice > order?.totalPrice) {
            const amount = recievedPrice - order.totalPrice;
            await this.transactionsService.createTransaction({ user: order.user, amount, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash back from completed order recieved amount by driver" });
            await this.transactionsService.createTransaction({ driver, amount: recievedPrice, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash recieved from customer completed order" });
        }
        if (order.pointsBack > 0)
            await this.transactionsService.createTransaction({ user: order.user, amount: order.pointsBack, order: order?._id, type: "Points", procedure: "Plus", paymentMethod: "Points", state: "Completed", description: "Points back from completed order" });
        return "Success";
    }
    async rateOrder(createRateOrderInput) {
        const { user, order, rate, description } = createRateOrderInput;
        if (!order || !user || !rate)
            throw new common_1.BadRequestException("order & user & rate required");
        if (!(0, mongoose_2.isValidObjectId)(order))
            throw new common_1.BadRequestException("There isn't order with this id");
        const currentOrder = await this.OrdersModel.findOne({ $and: [{ _id: order }, { user }, { hasRating: false }] });
        if (!currentOrder)
            throw new common_1.BadRequestException("you can't rate this order.");
        await this.OrdersModel.findByIdAndUpdate(currentOrder._id, { hasRating: true });
        const resultRate = await this.ratesService.rateResaurant({ user, rate, description, restaurant: currentOrder.restaurant });
        if (resultRate?.rates && resultRate?.rating)
            await this.restaurantsService.update(currentOrder.restaurant, { rates: resultRate.rates, rating: resultRate.rating });
        return "Success";
    }
    async deleteOrder(id, user) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        await this.OrdersModel.findOneAndDelete({ $and: [{ _id: id }, { user }, { $or: [{ state: "Completed" }, { state: "Rejected" }] }] });
        return "Success";
    }
    async create(createOrderInput) {
        if (!(0, mongoose_2.isValidObjectId)(createOrderInput?.user) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.address) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.restaurant) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.driver))
            throw new common_1.BadRequestException("There isn't user, address, restaurant or driver with this id");
        if (createOrderInput.meals?.length === 0)
            throw new common_1.BadRequestException("Please select meal to make order");
        const ActiveOrder = await this.OrdersModel.findOne({ $and: [{ user: createOrderInput.user }, { restaurant: createOrderInput.restaurant }, { $and: [{ state: { $ne: "Completed" } }, { state: { $ne: "Deleted" } }, { state: { $ne: "Canceled" } }] }] }, { _id: 1 });
        if (ActiveOrder)
            throw new common_1.BadRequestException("you have order in ordered.");
        let demoOrderDate = { ...createOrderInput, type: "Manual" };
        let totalPrice = 0;
        let totalPoints = 0;
        let pointsBack = 0;
        let price = 0;
        let priceAdditions = 0;
        const { deliveryPrice } = await this.restaurantsService.getDeliveryPrice(createOrderInput.restaurant);
        price += deliveryPrice;
        for (const single of createOrderInput.meals) {
            let additions = [];
            let addIngredients = [];
            let removeIngredients = [];
            const meal = await this.mealsService.findExtention(single.meal, createOrderInput?.restaurant);
            if (!meal)
                throw new common_1.BadRequestException("can't create order with meals isn't in this restaurant");
            price += meal.price * single.quantity;
            totalPoints += (meal.points * meal.price) * single.quantity;
            pointsBack += ((meal.pointsBack / 100) * meal.price) * single.quantity;
            if (single?.additions) {
                for (const addition of single.additions) {
                    const value = meal?.additions?.find((val) => val._id == addition);
                    if (value) {
                        additions = [...additions, value];
                        price += value.price;
                        totalPoints += (meal.points * value.price);
                        pointsBack += (meal.pointsBack / 100) * value.price;
                        priceAdditions += value.price;
                    }
                }
            }
            if (single?.addIngredients) {
                for (const addIngredient of single.addIngredients) {
                    const value = meal?.ingredients?.find((val) => val._id == addIngredient);
                    if (value)
                        addIngredients = [...addIngredients, value];
                }
            }
            if (single?.removeIngredients) {
                for (const removeIngredient of single.removeIngredients) {
                    const value = meal?.ingredients?.find((val) => val._id == removeIngredient);
                    if (value)
                        removeIngredients = [...removeIngredients, value];
                }
            }
            single.additions = additions;
            single.addIngredients = addIngredients;
            single.removeIngredients = removeIngredients;
        }
        totalPrice += price;
        const wallet = await this.walletsService.findUserWallet(createOrderInput.user);
        demoOrderDate = { ...demoOrderDate, walletPoints: wallet.points };
        const order = await this.OrdersModel.create({ ...demoOrderDate, totalPrice, price, state: "Pending", deliveryPrice, pointsBack });
        if (!order)
            throw new common_1.BadRequestException("you order haven't created please try again later");
        const finalOrder = await order.populate([{ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1 } }]);
        if (finalOrder?.user?.image)
            finalOrder.user.image = this.awsService.getUrl(finalOrder.user.image);
        return finalOrder;
    }
    async findAll(limitEntity) {
        const startIndex = (limitEntity.page) * limitEntity.limit;
        const total = await this.OrdersModel.countDocuments();
        const orders = await this.OrdersModel.find().sort({ _id: -1 }).limit(limitEntity.limit).skip(startIndex).populate([{ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1 } }]);
        for (const order of orders) {
            if (order?.user?.image)
                order.user.image = this.awsService.getUrl(order.user.image);
        }
        return { data: orders, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findUserOrders(limitEntity) {
        const startIndex = (limitEntity.page) * limitEntity.limit;
        const total = await this.OrdersModel.countDocuments({ user: limitEntity.user });
        const orders = await this.OrdersModel.find({ user: limitEntity.user }).sort({ _id: -1 }).limit(limitEntity.limit).skip(startIndex).populate({ path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } });
        for (const single of orders) {
            if (single?.restaurant?.image)
                single.restaurant.image = this.awsService.getUrl(single.restaurant.image);
        }
        return { data: orders, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findDriverOrders(limitEntity) {
        const startIndex = (limitEntity.page) * limitEntity.limit;
        const total = await this.OrdersModel.countDocuments({ driver: limitEntity.user });
        const orders = await this.OrdersModel.find({ driver: limitEntity.user }).sort({ _id: -1 }).limit(limitEntity.limit).skip(startIndex).populate({ path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } });
        for (const single of orders) {
            if (single?.restaurant?.image)
                single.restaurant.image = this.awsService.getUrl(single.restaurant.image);
        }
        return { data: orders, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findOne(id) {
        const order = await this.OrdersModel.findById(id).populate([{ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { _id: 1 } }, { path: "meals.meal" }, { path: "driver", select: { name: 1, phoneNumber: 1, image: 1 } }]);
        if (order?.user?.image)
            order.user.image = this.awsService.getUrl(order.user.image);
        if (order?.restaurant?.image)
            order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
        return order;
    }
    async update(id, updateOrderInput) {
        await this.OrdersModel.findByIdAndUpdate(id, updateOrderInput);
        return "Success";
    }
    async state(stateInput) {
        await this.OrdersModel.findByIdAndUpdate(stateInput.id, stateInput);
        return "Success";
    }
    async remove(id) {
        await this.OrdersModel.findByIdAndDelete(id);
        return "Success";
    }
    async home() {
        let week = { d0: 0, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0 };
        let status = { Pending: 0, InProgress: 0, InDelivery: 0, Completed: 0, Canceled: 0 };
        const data = new Date().setDate(new Date().getDate() - 7);
        const ordersInWeek = await this.OrdersModel.aggregate([
            { $match: { $and: [{ createdAt: { $gte: new Date(data) } }, { createdAt: { $lte: new Date() } }] } },
            { $group: { _id: "createAt", total: { $push: { createdAt: "$createdAt", state: "$state" } }, } },
        ]);
        if (ordersInWeek[0]?.total) {
            for (const single of ordersInWeek[0]?.total) {
                status = { ...status, [single.state]: status[single.state] + 1 };
                week = { ...week, [`d${new Date(single.createdAt).getDay()}`]: week[`d${new Date(single.createdAt).getDay()}`] + 1 };
            }
        }
        const orders = await this.OrdersModel.countDocuments({ state: "Completed" });
        const recentlyOrders = await this.OrdersModel.find().sort({ _id: -1 }).limit(10).populate([{ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1 } }]).select(["user", "restaurant", "price", "totalPrice", "state"]);
        for (const single of recentlyOrders) {
            if (single?.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        const drivers = await this.driversService.home();
        const restaurants = await this.restaurantsService.home();
        const meals = await this.mealsService.home();
        const { recentlyRating, rating, total } = await this.ratesService.home();
        const { users, recentlyUsers } = await this.usersService.home();
        return { orders, recentlyOrders, week, status, users, recentlyUsers, rating, total, recentlyRating, restaurants, meals, drivers };
    }
    async ordersReport(date) {
        const year = new Date(date);
        let result = declearedMonths_1.months;
        const orders = await this.OrdersModel.aggregate([
            { $match: { $and: [{ createdAt: { $gte: year } }, { createdAt: { $lte: new Date() } }, { state: "Completed" }] } },
            { $group: { _id: "createAt", total: { $push: "$createdAt" }, } },
        ]);
        if (orders?.length) {
            for (const single of orders[0]?.total) {
                result = { ...result, [`m${new Date(single).getMonth()}`]: { ...result[`m${new Date(single).getMonth()}`], [`d${new Date(single).getDate()}`]: result[`m${new Date(single).getMonth()}`][`d${new Date(single).getDate()}`] + 1 } };
            }
        }
        return result;
    }
    async profitsReport(date) {
        const year = new Date(date);
        let result = declearedMonths_1.months;
        const orders = await this.OrdersModel.aggregate([
            { $match: { $and: [{ createdAt: { $gte: year } }, { createdAt: { $lte: new Date() } }, { state: "Completed" }] } },
            { $group: { _id: "createAt", total: { $push: { createdAt: "$createdAt", price: "$price" } }, } },
        ]);
        if (orders?.length) {
            for (const single of orders[0]?.total) {
                result = { ...result, [`m${new Date(single?.createdAt).getMonth()}`]: { ...result[`m${new Date(single?.createdAt).getMonth()}`], [`d${new Date(single?.createdAt).getDate()}`]: result[`m${new Date(single?.createdAt).getMonth()}`][`d${new Date(single?.createdAt).getDate()}`] + (single?.price ? single.price : 0) } };
            }
        }
        return result;
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Orders")),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => meals_service_1.MealsService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => promo_codes_service_1.PromoCodesService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => wallets_service_1.WalletsService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => rates_service_1.RatesService))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => restaurants_service_1.RestaurantsService))),
    __param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => drivers_service_1.DriversService))),
    __param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => transactions_service_1.TransactionsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        meals_service_1.MealsService,
        promo_codes_service_1.PromoCodesService,
        wallets_service_1.WalletsService,
        users_service_1.UsersService,
        rates_service_1.RatesService,
        restaurants_service_1.RestaurantsService,
        drivers_service_1.DriversService,
        transactions_service_1.TransactionsService,
        aws_service_1.AwsService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map