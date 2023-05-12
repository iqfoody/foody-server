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
let OrdersService = class OrdersService {
    constructor(OrdersModel, mealsService, awsService, promoCodeService, walletsService, usersService, ratesService, restaurantsService) {
        this.OrdersModel = OrdersModel;
        this.mealsService = mealsService;
        this.awsService = awsService;
        this.promoCodeService = promoCodeService;
        this.walletsService = walletsService;
        this.usersService = usersService;
        this.ratesService = ratesService;
        this.restaurantsService = restaurantsService;
    }
    async create(createOrderInput) {
        const order = await this.OrdersModel.create(Object.assign(Object.assign({}, createOrderInput), { type: "Manual" }));
        return order;
    }
    async createOrder(createOrderInput) {
        var _a, _b, _c;
        const checkIfHasOrderActive = await this.OrdersModel.findOne({ $and: [{ user: createOrderInput.user }, { $and: [{ state: { $ne: "Completed" } }, { state: { $ne: "Deleted" } }] }] }, { _id: 1 });
        if (checkIfHasOrderActive)
            throw new common_1.BadRequestException("you have order in ordered.");
        let demoOrderDate = Object.assign(Object.assign({}, createOrderInput), { type: "Auto" });
        let totalPrice = 0;
        let totalPoints = 0;
        let price = 0;
        let priceAdditions = 0;
        const { deliveryPrice } = await this.restaurantsService.getDeliveryPrice(createOrderInput.restaurant);
        price += deliveryPrice;
        for (const single of createOrderInput.meals) {
            let additions = [];
            let addIngredients = [];
            let removeIngredients = [];
            const meal = await this.mealsService.findExtention(single.meal);
            price += meal.price * single.quantity;
            totalPoints += meal.points * single.quantity;
            if (single === null || single === void 0 ? void 0 : single.additions) {
                for (const addition of single.additions) {
                    const value = (_a = meal === null || meal === void 0 ? void 0 : meal.additions) === null || _a === void 0 ? void 0 : _a.find((val) => val._id == addition);
                    if (value) {
                        additions = [...additions, value];
                        price += value.price;
                        priceAdditions += value.price;
                    }
                }
            }
            if (single === null || single === void 0 ? void 0 : single.addIngredients) {
                for (const addIngredient of single.addIngredients) {
                    const value = (_b = meal === null || meal === void 0 ? void 0 : meal.ingredients) === null || _b === void 0 ? void 0 : _b.find((val) => val._id == addIngredient);
                    if (value)
                        addIngredients = [...addIngredients, value];
                }
            }
            if (single === null || single === void 0 ? void 0 : single.removeIngredients) {
                for (const removeIngredient of single.removeIngredients) {
                    const value = (_c = meal === null || meal === void 0 ? void 0 : meal.ingredients) === null || _c === void 0 ? void 0 : _c.find((val) => val._id == removeIngredient);
                    if (value)
                        removeIngredients = [...removeIngredients, value];
                }
            }
            single.additions = additions;
            single.addIngredients = addIngredients;
            single.removeIngredients = removeIngredients;
        }
        totalPrice += price + deliveryPrice;
        if ((createOrderInput === null || createOrderInput === void 0 ? void 0 : createOrderInput.promoCode) && (createOrderInput === null || createOrderInput === void 0 ? void 0 : createOrderInput.paymentMethod) !== "Points") {
            const promoCode = await this.promoCodeService.check(createOrderInput.promoCode, createOrderInput.user);
            await this.promoCodeService.usePromoCode(createOrderInput.promoCode, createOrderInput.user);
            if (promoCode.type === 'Price') {
                totalPrice += -promoCode.discount;
                demoOrderDate = Object.assign(Object.assign({}, demoOrderDate), { discountType: "Price", discount: promoCode.discount, promoCode: promoCode.name });
            }
            if (promoCode.type === 'Percent') {
                totalPrice += -totalPrice * (promoCode.discount / 100);
                demoOrderDate = Object.assign(Object.assign({}, demoOrderDate), { discountType: "Percent", discount: promoCode.discount, promoCode: promoCode.name });
            }
            ;
        }
        if ((createOrderInput === null || createOrderInput === void 0 ? void 0 : createOrderInput.paymentMethod) !== 'Cash') {
            const user = await this.usersService.findWallet(createOrderInput.user);
            const wallet = await this.walletsService.findOne(user.wallet);
            if ((wallet === null || wallet === void 0 ? void 0 : wallet.amount) && (createOrderInput === null || createOrderInput === void 0 ? void 0 : createOrderInput.paymentMethod) === 'Wallet') {
                demoOrderDate = Object.assign(Object.assign({}, demoOrderDate), { walletAmount: wallet.amount });
                if (wallet.amount >= totalPrice) {
                    const newAmount = wallet.amount - totalPrice;
                    await this.walletsService.update(wallet._id, { amount: newAmount });
                    totalPrice = 0;
                }
                else {
                    totalPrice += -wallet.amount;
                    console.log(totalPrice, wallet.amount);
                    await this.walletsService.update(wallet._id, { amount: 0 });
                }
            }
            else if ((wallet === null || wallet === void 0 ? void 0 : wallet.points) && (createOrderInput === null || createOrderInput === void 0 ? void 0 : createOrderInput.paymentMethod) === 'Points') {
                demoOrderDate = Object.assign(Object.assign({}, demoOrderDate), { walletPoints: wallet.points });
                console.log(totalPoints, wallet.points);
                if (totalPoints > wallet.points)
                    throw new common_1.BadRequestException("your points is'nt enough");
                if (wallet.points >= totalPoints) {
                    const newPoints = wallet.points - totalPoints;
                    await this.walletsService.update(wallet._id, { points: newPoints });
                    totalPrice = deliveryPrice + priceAdditions;
                }
                demoOrderDate = Object.assign(Object.assign({}, demoOrderDate), { totalPoints });
            }
        }
        const order = await this.OrdersModel.create(Object.assign(Object.assign({}, demoOrderDate), { totalPrice, price, state: "Completed", deliveryPrice }));
        return order;
    }
    async findAll(limitEntity) {
        const startIndex = (limitEntity.page) * limitEntity.limit;
        const total = await this.OrdersModel.find().countDocuments({});
        const orders = await this.OrdersModel.find().sort({ _id: -1 }).limit(limitEntity.limit).skip(startIndex);
        return { data: orders, page: Math.ceil(total / limitEntity.limit) };
    }
    async findOrders(user, state) {
        var _a, _b;
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
            if ((_a = order === null || order === void 0 ? void 0 : order.restaurant) === null || _a === void 0 ? void 0 : _a.image)
                order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
            if (order === null || order === void 0 ? void 0 : order.meals) {
                for (const meal of order.meals) {
                    if ((_b = meal === null || meal === void 0 ? void 0 : meal.meal) === null || _b === void 0 ? void 0 : _b.image)
                        meal.meal.image = this.awsService.getUrl(meal.meal.image);
                }
            }
        }
        return orders;
    }
    findOne(id) {
        return this.OrdersModel.findById(id);
    }
    async findOrder(id, user) {
        var _a, _b;
        const order = await this.OrdersModel.findOne({ $and: [{ _id: id }, { user }, { state: { $ne: "Deleted" } }] }).select(['-__v', '-updatedAt', '-type', '-user']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }]);
        if ((_a = order === null || order === void 0 ? void 0 : order.restaurant) === null || _a === void 0 ? void 0 : _a.image)
            order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
        if (order === null || order === void 0 ? void 0 : order.meals) {
            for (const meal of order.meals) {
                if ((_b = meal === null || meal === void 0 ? void 0 : meal.meal) === null || _b === void 0 ? void 0 : _b.image)
                    meal.meal.image = this.awsService.getUrl(meal.meal.image);
            }
        }
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
    cancelOrder(id, user) {
        return this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { user }, { state: "Pending" }] }, { state: "Canceled" });
    }
    inDeliveryOrder(id, driver) {
        return this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { driver }, { state: "InProgress" }] }, { state: "InDelivery" });
    }
    completeOrder(id, driver, recievedPrice) {
        return this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { driver }, { state: "InDelivery" }] }, { state: "Completed", recievedPrice });
    }
    async rateOrder(createRateOrderInput) {
        const { user, order, rate, description } = createRateOrderInput;
        if (!order || !user || !rate)
            throw new common_1.BadRequestException("order & user & rate required");
        const currentOrder = await this.OrdersModel.findOne({ $and: [{ _id: order }, { user }, { hasRating: false }] });
        if (!currentOrder)
            throw new common_1.BadRequestException("you can't rate this order.");
        await this.OrdersModel.findByIdAndUpdate(currentOrder._id, { hasRating: true });
        const resultRate = await this.ratesService.rateResaurant({ user, rate, description, restaurant: currentOrder.restaurant });
        if ((resultRate === null || resultRate === void 0 ? void 0 : resultRate.rates) && (resultRate === null || resultRate === void 0 ? void 0 : resultRate.rating))
            await this.restaurantsService.update(currentOrder.restaurant, { rates: resultRate.rates, rating: resultRate.rating });
        return "Success";
    }
    async deleteOrder(id, user) {
        await this.OrdersModel.findOneAndDelete({ $and: [{ _id: id }, { user }, { $or: [{ state: "Completed" }, { state: "Rejected" }] }] });
        return "Success";
    }
    async remove(id) {
        await this.OrdersModel.findByIdAndDelete(id);
        return "Success";
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Orders")),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => meals_service_1.MealsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        meals_service_1.MealsService,
        aws_service_1.AwsService,
        promo_codes_service_1.PromoCodesService,
        wallets_service_1.WalletsService,
        users_service_1.UsersService,
        rates_service_1.RatesService,
        restaurants_service_1.RestaurantsService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map