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
const notifications_service_1 = require("../notifications/notifications.service");
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
    notificationsService;
    awsService;
    constructor(OrdersModel, mealsService, promoCodeService, walletsService, usersService, ratesService, restaurantsService, driversService, transactionsService, notificationsService, awsService) {
        this.OrdersModel = OrdersModel;
        this.mealsService = mealsService;
        this.promoCodeService = promoCodeService;
        this.walletsService = walletsService;
        this.usersService = usersService;
        this.ratesService = ratesService;
        this.restaurantsService = restaurantsService;
        this.driversService = driversService;
        this.transactionsService = transactionsService;
        this.notificationsService = notificationsService;
        this.awsService = awsService;
    }
    async createOrder(createOrderInput) {
        if (!(0, mongoose_2.isValidObjectId)(createOrderInput?.address) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.restaurant))
            throw new common_1.BadRequestException("There isn't address orrestaurant with this id");
        if (createOrderInput.meals?.length === 0)
            throw new common_1.BadRequestException("Please select meal to make order");
        const { _id } = await this.usersService.findId(createOrderInput.user);
        const ActiveOrder = await this.OrdersModel.findOne({ $and: [{ user: _id }, { restaurant: createOrderInput.restaurant }, { $and: [{ state: { $ne: "Completed" } }, { state: { $ne: "Deleted" } }, { state: { $ne: "Canceled" } }] }] }, { _id: 1 });
        if (ActiveOrder)
            throw new common_1.BadRequestException("you have order in ordered.");
        const restaurant = await this.restaurantsService.findRestaurant(createOrderInput.restaurant);
        if (!restaurant)
            throw new common_1.BadRequestException("There isn't restaurant with this restaruant id");
        let demoOrderDate = { ...createOrderInput, user: _id, type: "Auto" };
        let totalPrice = 0;
        let totalPoints = 0;
        let pointsBack = 0;
        let price = 0;
        let priceAdditions = 0;
        let priceAfterDiscount = 0;
        let totalDiscount = 0;
        let transaction = {
            user: _id,
            amount: 0
        };
        let usePromoCode = false;
        let discount = restaurant?.discount || 0;
        let minDiscount = restaurant?.minDiscount || 0;
        let maxDiscount = restaurant?.maxDiscount || 0;
        const deliveryPrice = restaurant?.deliveryPrice || 0;
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
            if (meal.discount > 0) {
                priceAfterDiscount += (meal.price * (meal.discount / 100)) * single.quantity;
            }
            if (single?.additions) {
                for (const addition of single.additions) {
                    const value = meal?.additions?.find((val) => val._id == addition);
                    if (value) {
                        const item = additions?.find(res => res?.addition?._id === value?._id);
                        if (item) {
                            item.quantity = item.quantity + 1;
                            additions = additions?.map(res => res.addition === item.addition._id ? item : res);
                        }
                        else {
                            additions = [...additions, { addition: value, quantity: 1 }];
                        }
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
        if (discount > 0 && totalPrice >= minDiscount) {
            if (maxDiscount === 0 || totalPrice < maxDiscount) {
                totalPrice += -(totalPrice * (discount / 100));
                totalDiscount += (totalPrice * (discount / 100));
            }
            else if (totalPrice > maxDiscount) {
                totalPrice += -maxDiscount;
                totalDiscount += maxDiscount;
            }
        }
        else if (priceAfterDiscount > 0) {
            totalPrice += -priceAfterDiscount;
            totalDiscount += priceAfterDiscount;
        }
        if (createOrderInput?.promoCode && createOrderInput?.paymentMethod !== "Points") {
            const promoCode = await this.promoCodeService.check(createOrderInput.promoCode, createOrderInput.user);
            if (!promoCode?.name)
                throw new common_1.BadRequestException("You can't use promo code dosn't exist");
            usePromoCode = true;
            if (promoCode.type === 'Price') {
                totalPrice += -promoCode.discount;
                if (totalPrice < 0)
                    totalPrice = 0;
                demoOrderDate = { ...demoOrderDate, discountType: "Price", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name };
                let precentValue = (price / promoCode.discount) / 100;
                pointsBack += -(pointsBack * precentValue);
            }
            if (promoCode.type === 'Percent') {
                totalPrice += -totalPrice * (promoCode.discount / 100);
                if (totalPrice < 0)
                    totalPrice = 0;
                demoOrderDate = { ...demoOrderDate, discountType: "Percent", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name };
                pointsBack += -(pointsBack * (promoCode.discount / 100));
            }
            ;
        }
        price += deliveryPrice;
        totalPrice += deliveryPrice;
        const wallet = await this.walletsService.findUserWallet(_id);
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
        const no = await this.OrdersModel.countDocuments();
        const order = await this.OrdersModel.create({ ...demoOrderDate, totalPrice, price, state: "Pending", discount, deliveryPrice, pointsBack, no, totalDiscount });
        if (!order)
            throw new common_1.BadRequestException("you order haven't created please try again later");
        if (usePromoCode && createOrderInput?.paymentMethod !== "Points")
            await this.promoCodeService.usePromoCode(createOrderInput.promoCode, _id);
        if (createOrderInput?.paymentMethod === "Wallet" && transaction.amount !== 0) {
            await this.transactionsService.createTransaction({ ...transaction, order: order?._id, type: "Amount", procedure: "Minus", paymentMethod: "Wallet", state: "Pending", description: "payed for cost order" });
        }
        else if (createOrderInput?.paymentMethod === "Points" && transaction.amount !== 0) {
            await this.transactionsService.createTransaction({ ...transaction, order: order?._id, type: "Points", procedure: "Minus", paymentMethod: "Points", state: "Pending", description: "payed for cost order points" });
        }
        await this.notificationsService.createVertual({ user: _id, order: order._id, restaurant: createOrderInput.restaurant, type: "Management", title: "New order", titleEN: "New order", body: "you hane a new pending order", bodyEN: "you hane a new pending order" });
        return order;
    }
    async findOrders(phoneNumber, state) {
        const { _id } = await this.usersService.findId(phoneNumber);
        let orders = [];
        if (state && state === "Deleted")
            return;
        if (!state) {
            orders = await this.OrdersModel.find({ $and: [{ user: _id }, { state: { $ne: "Deleted" } }] }).select(['-__v', '-updatedAt', '-type', '-user']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }, { path: "driver", select: { name: 1, phoneNumber: 1, image: 1 } }]);
        }
        else if (state) {
            orders = await this.OrdersModel.find({ $and: [{ user: _id }, { state }] }).select(['-__v', '-updatedAt', '-type', '-user']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }, { path: "driver", select: { name: 1, phoneNumber: 1, image: 1 } }]);
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
            if (order?.driver?.image)
                order.driver.image = this.awsService.getUrl(order.driver.image);
        }
        return orders;
    }
    async findOrdersDriver(phoneNumber, state) {
        const { _id } = await this.driversService.findId(phoneNumber);
        let orders = [];
        if (state && state === "Deleted")
            return;
        if (!state) {
            orders = await this.OrdersModel.find({ $and: [{ driver: _id }, { state: { $ne: "Deleted" } }] }).select(['-__v', '-updatedAt', '-type']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }, { path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }]);
        }
        else if (state) {
            orders = await this.OrdersModel.find({ $and: [{ driver: _id }, { state }] }).select(['-__v', '-updatedAt', '-type']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }, { path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }]);
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
            if (order?.user?.image)
                order.user.image = this.awsService.getUrl(order.user.image);
        }
        return orders;
    }
    async findOrder(id, phoneNumber) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        const { _id } = await this.usersService.findId(phoneNumber);
        const order = await this.OrdersModel.findOne({ $and: [{ _id: id }, { user: _id }, { state: { $ne: "Deleted" } }] }).select(['-__v', '-updatedAt', '-type', '-user']).populate([{ path: 'restaurant', select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "address", select: { title: 1, longitude: 1, latitude: 1, _id: 0 } }, { path: "meals.meal", select: { title: 1, titleEN: 1, titleKR: 1, price: 1, image: 1 } }]);
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
    async cancelOrder(id, phoneNumber) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        const { _id } = await this.usersService.findId(phoneNumber);
        const order = await this.OrdersModel.findById(id);
        if (!order)
            throw new common_1.BadRequestException("Sorry, order not found");
        const updatedOrder = await this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { user: _id }, { state: "Pending" }] }, { state: "Canceled" });
        if (!updatedOrder)
            throw new common_1.BadRequestException("Sorry, you can't canceled this order");
        if (order?.paymentMethod !== "Cash")
            await this.transactionsService.cancelTransaction(order._id, _id);
        await this.notificationsService.createVertual({ user: _id, order: order._id, restaurant: order.restaurant, type: "Management", title: "Canceled order", titleEN: "Canceled order", body: "Order has been canceled", bodyEN: "Order has been canceled" });
        return "Success";
    }
    async inDeliveryOrder(id, phoneNumber) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        const { _id } = await this.driversService.findId(phoneNumber);
        const updatedOrder = await this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { driver: _id }, { state: "InProgress" }] }, { state: "InDelivery" });
        if (!updatedOrder)
            throw new common_1.BadRequestException("This order isn't in progress, make sure this order if an in progress state");
        await this.notificationsService.sendPrivate({ user: updatedOrder.user, order: id, restaurant: updatedOrder.restaurant, type: "Private", title: "فودي", titleEN: "Foody", body: "السائق في طريقه اليك", bodyEN: "The driver is on his way to you" });
        return "Success";
    }
    async completeOrder(id, phoneNumber, recievedPrice) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        const { _id } = await this.driversService.findId(phoneNumber);
        const order = await this.OrdersModel.findOne({ $and: [{ _id: id }, { driver: _id }, { state: "InDelivery" }] }, { totalPrice: 1, pointsBack: 1, user: 1, restaurant: 1 });
        if (!order?._id || order?.totalPrice > recievedPrice)
            throw new common_1.NotAcceptableException("There isn't order for this action or recieved price isn't enough");
        await this.transactionsService.completeTransaction(order._id, _id);
        await this.OrdersModel.findByIdAndUpdate(order._id, { state: "Completed", recievedPrice });
        if (recievedPrice > order?.totalPrice) {
            const amount = recievedPrice - order.totalPrice;
            await this.transactionsService.createTransaction({ user: order.user, amount, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash back from completed order recieved amount by driver" });
            await this.transactionsService.createTransaction({ driver: _id, amount: recievedPrice, order: order?._id, type: "Amount", procedure: "Plus", paymentMethod: "Cash", state: "Completed", description: "Cash recieved from customer completed order" });
        }
        if (order.pointsBack > 0)
            await this.transactionsService.createTransaction({ user: order.user, amount: order.pointsBack, order: order?._id, type: "Points", procedure: "Plus", paymentMethod: "Points", state: "Completed", description: "Points back from completed order" });
        await this.notificationsService.sendPrivate({ user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "فودي", titleEN: "Foody", body: "تم تسليم طلبك بنجاح", bodyEN: "Your order is completed" });
        return "Success";
    }
    async rateOrder(createRateOrderInput) {
        const { user, order, rate, description } = createRateOrderInput;
        if (!order || !user || !rate)
            throw new common_1.BadRequestException("order & user & rate required");
        if (!(0, mongoose_2.isValidObjectId)(order))
            throw new common_1.BadRequestException("There isn't order with this id");
        const { _id } = await this.usersService.findId(user);
        const currentOrder = await this.OrdersModel.findOne({ $and: [{ _id: order }, { user: _id }, { hasRating: false }] });
        if (!currentOrder)
            throw new common_1.BadRequestException("you can't rate this order.");
        await this.OrdersModel.findByIdAndUpdate(currentOrder._id, { hasRating: true });
        const resultRate = await this.ratesService.rateResaurant({ user: _id, rate, description, restaurant: currentOrder.restaurant });
        if (resultRate?.rates && resultRate?.rating)
            await this.restaurantsService.update(currentOrder.restaurant, { rates: resultRate.rates, rating: resultRate.rating });
        return "Success";
    }
    async deleteOrder(id, phoneNumber) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        const { _id } = await this.usersService.findId(phoneNumber);
        const deleted = await this.OrdersModel.findOneAndUpdate({ $and: [{ _id: id }, { user: _id }, { $or: [{ state: "Completed" }, { state: "Canceled" }] }] }, { state: "Deleted" });
        if (!deleted)
            throw new common_1.BadRequestException("You can't delete order isn't completed yet");
        return "Success";
    }
    async create(createOrderInput) {
        if (!(0, mongoose_2.isValidObjectId)(createOrderInput?.user) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.address) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.restaurant) || !(0, mongoose_2.isValidObjectId)(createOrderInput?.driver))
            throw new common_1.BadRequestException("There isn't user, address, restaurant or driver with this id");
        if (createOrderInput.meals?.length === 0)
            throw new common_1.BadRequestException("Please select meal to make order");
        const ActiveOrder = await this.OrdersModel.findOne({ $and: [{ user: createOrderInput.user }, { restaurant: createOrderInput.restaurant }, { $and: [{ state: { $ne: "Completed" } }, { state: { $ne: "Deleted" } }, { state: { $ne: "Canceled" } }] }] }, { _id: 1 });
        if (ActiveOrder)
            throw new common_1.BadRequestException("you have order in ordered");
        const restaurant = await this.restaurantsService.findRestaurant(createOrderInput.restaurant);
        if (!restaurant)
            throw new common_1.BadRequestException("There isn't restaurant with this restaruant id");
        let demoOrderDate = { ...createOrderInput, type: "Manual" };
        let totalPrice = 0;
        let totalPoints = 0;
        let pointsBack = 0;
        let price = 0;
        let priceAdditions = 0;
        let priceAfterDiscount = 0;
        let totalDiscount = 0;
        let discount = restaurant?.discount || 0;
        let minDiscount = restaurant?.minDiscount || 0;
        let maxDiscount = restaurant?.maxDiscount || 0;
        let usePromoCode = false;
        const deliveryPrice = restaurant?.deliveryPrice || 0;
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
            if (meal.discount > 0) {
                priceAfterDiscount += (meal.price * (meal.discount / 100)) * single.quantity;
            }
            if (single?.additions) {
                for (const addition of single.additions) {
                    const value = meal?.additions?.find((val) => val._id == addition);
                    if (value) {
                        const item = additions?.find(res => res?.addition?._id === value?._id);
                        if (item) {
                            item.quantity = item.quantity + 1;
                            additions = additions?.map(res => res.addition === item.addition._id ? item : res);
                        }
                        else {
                            additions = [...additions, { addition: value, quantity: 1 }];
                        }
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
        if (discount > 0 && totalPrice >= minDiscount) {
            if (maxDiscount === 0 || totalPrice < maxDiscount) {
                totalPrice += -(totalPrice * (discount / 100));
                totalDiscount += (totalPrice * (discount / 100));
            }
            else if (totalPrice >= maxDiscount) {
                totalPrice += -maxDiscount;
                totalDiscount += maxDiscount;
            }
        }
        else if (priceAfterDiscount > 0) {
            totalPrice += -priceAfterDiscount;
            totalDiscount += priceAfterDiscount;
        }
        if (createOrderInput?.promoCode) {
            const promoCode = await this.promoCodeService.checkPromoCode({ name: createOrderInput.promoCode, user: createOrderInput.user });
            if (!promoCode?.name)
                throw new common_1.BadRequestException("You can't use promo code dosn't exist");
            usePromoCode = true;
            if (promoCode.type === 'Price') {
                totalPrice += -promoCode.discount;
                if (totalPrice < 0)
                    totalPrice = 0;
                demoOrderDate = { ...demoOrderDate, discountType: "Price", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name };
                let precentValue = (price / promoCode.discount) / 100;
                pointsBack += -(pointsBack * precentValue);
            }
            else if (promoCode.type === 'Percent') {
                totalPrice += -totalPrice * (promoCode.discount / 100);
                if (totalPrice < 0)
                    totalPrice = 0;
                demoOrderDate = { ...demoOrderDate, discountType: "Percent", promoCodeDiscount: promoCode.discount, promoCode: promoCode.name };
                pointsBack += -(pointsBack * (promoCode.discount / 100));
            }
            ;
        }
        price += deliveryPrice;
        totalPrice += deliveryPrice;
        const wallet = await this.walletsService.findUserWallet(createOrderInput.user);
        demoOrderDate = { ...demoOrderDate, walletPoints: wallet.points };
        const no = await this.OrdersModel.countDocuments();
        const order = await this.OrdersModel.create({ ...demoOrderDate, totalPrice, price, state: "Pending", discount, deliveryPrice, pointsBack, no, totalDiscount });
        if (!order)
            throw new common_1.BadRequestException("you order haven't created please try again later");
        if (usePromoCode)
            await this.promoCodeService.usePromoCode(createOrderInput.promoCode, createOrderInput.user);
        const finalOrder = await order.populate([{ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1 } }]);
        if (finalOrder?.user?.image)
            finalOrder.user.image = this.awsService.getUrl(finalOrder.user.image);
        return finalOrder;
    }
    async findAll(limitEntity) {
        let readed = true;
        const startIndex = (limitEntity.page) * limitEntity.limit;
        const total = await this.OrdersModel.countDocuments();
        const orders = await this.OrdersModel.find().sort({ _id: -1 }).limit(limitEntity.limit).skip(startIndex).populate([{ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1 } }]);
        for (const order of orders) {
            if (order?.user?.image)
                order.user.image = this.awsService.getUrl(order.user.image);
            if (!order?.readed)
                readed = false;
        }
        if (!readed)
            await this.OrdersModel.updateMany({ readed: false }, { readed: true });
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
        const order = await this.OrdersModel.findById(id).populate([{ path: "user" }, { path: "restaurant" }, { path: "address" }, { path: "meals.meal" }, { path: "driver" }]);
        if (order?.user?.image)
            order.user.image = this.awsService.getUrl(order.user.image);
        if (order?.restaurant?.image)
            order.restaurant.image = this.awsService.getUrl(order.restaurant.image);
        return order;
    }
    async update(id, updateOrderInput) {
        if (!(0, mongoose_2.isValidObjectId)(updateOrderInput?.address) || !(0, mongoose_2.isValidObjectId)(updateOrderInput?.driver) || !(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't user, address, restaurant or driver with this id");
        if (updateOrderInput.meals?.length === 0)
            throw new common_1.BadRequestException("Please select meal to make order");
        const order = await this.OrdersModel.findById(id);
        const restaurant = await this.restaurantsService.findRestaurant(order.restaurant);
        if (!restaurant)
            throw new common_1.BadRequestException("There isn't restaurant with this restaruant id");
        let demoOrderDate = updateOrderInput;
        let totalPrice = 0;
        let totalPoints = 0;
        let pointsBack = 0;
        let price = 0;
        let priceAdditions = 0;
        let priceAfterDiscount = 0;
        let totalDiscount = 0;
        let discount = restaurant?.discount || 0;
        let minDiscount = restaurant?.minDiscount || 0;
        let maxDiscount = restaurant?.maxDiscount || 0;
        const deliveryPrice = restaurant?.deliveryPrice || 0;
        let transaction = {
            user: order.user,
            amount: 0
        };
        for (const single of updateOrderInput.meals) {
            let additions = [];
            let addIngredients = [];
            let removeIngredients = [];
            const meal = await this.mealsService.findExtention(single.meal, order.restaurant);
            if (!meal)
                throw new common_1.BadRequestException("can't update order with meals isn't in this restaurant");
            price += meal.price * single.quantity;
            totalPoints += (meal.points * meal.price) * single.quantity;
            pointsBack += ((meal.pointsBack / 100) * meal.price) * single.quantity;
            if (meal.discount > 0) {
                priceAfterDiscount += (meal.price * (meal.discount / 100)) * single.quantity;
            }
            if (single?.additions) {
                for (const addition of single.additions) {
                    const value = meal?.additions?.find((val) => val._id == addition);
                    if (value) {
                        const item = additions?.find(res => res?.addition?._id === value?._id);
                        if (item) {
                            item.quantity = item.quantity + 1;
                            additions = additions?.map(res => res.addition === item.addition._id ? item : res);
                        }
                        else {
                            additions = [...additions, { addition: value, quantity: 1 }];
                        }
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
        if (discount > 0 && totalPrice >= minDiscount) {
            if (maxDiscount === 0 || totalPrice < maxDiscount) {
                totalPrice += -(totalPrice * (discount / 100));
                totalDiscount += (totalPrice * (discount / 100));
            }
            else if (totalPrice >= maxDiscount) {
                totalPrice += -maxDiscount;
                totalDiscount += maxDiscount;
            }
        }
        else if (priceAfterDiscount > 0) {
            totalPrice += -priceAfterDiscount;
            totalDiscount += priceAfterDiscount;
        }
        if (order?.promoCode) {
            const promoCodeType = order.promoCodeDiscount <= 100 ? "Percent" : "Price";
            if (promoCodeType === 'Price') {
                totalPrice += -order.promoCodeDiscount;
                if (totalPrice < 0)
                    totalPrice = 0;
                let precentValue = (price / order.promoCodeDiscount) / 100;
                pointsBack += -(pointsBack * precentValue);
            }
            else if (promoCodeType === 'Percent') {
                totalPrice += -totalPrice * (order.promoCodeDiscount / 100);
                if (totalPrice < 0)
                    totalPrice = 0;
                pointsBack += -(pointsBack * (order.promoCodeDiscount / 100));
            }
            ;
        }
        price += deliveryPrice;
        totalPrice += deliveryPrice;
        if (order?.paymentMethod !== 'Cash') {
            if (order?.walletAmount && order?.paymentMethod === 'Wallet') {
                if (order?.walletAmount >= totalPrice) {
                    transaction = { ...transaction, amount: totalPrice };
                    totalPrice = 0;
                }
                else if (order?.walletAmount > 0) {
                    totalPrice += -order?.walletAmount;
                    transaction = { ...transaction, amount: order?.walletAmount };
                }
                else {
                    demoOrderDate = { ...demoOrderDate, paymentMethod: "Cash" };
                }
            }
            else if (order?.walletPoints && order?.paymentMethod === 'Points') {
                if (totalPoints > order?.walletPoints)
                    throw new common_1.BadRequestException("your points is'nt enough");
                if (order?.walletPoints >= totalPoints) {
                    transaction = { ...transaction, amount: totalPoints };
                    totalPrice = deliveryPrice;
                }
                demoOrderDate = { ...demoOrderDate, totalPoints };
            }
        }
        const updatedOrder = await this.OrdersModel.findByIdAndUpdate(id, { ...demoOrderDate, totalPrice, price, pointsBack, discount, totalDiscount }, { new: true }).populate([{ path: "user" }, { path: "restaurant" }, { path: "address" }, { path: "meals.meal" }, { path: "driver" }]);
        if (!updatedOrder)
            throw new common_1.BadRequestException("you order haven't updated please try again later");
        if (updateOrderInput?.driver)
            await this.notificationsService.sendPrivate({ driver: order.driver, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تعديل الطلب", titleEN: "Order updated", body: "تم تعديل طلبك", bodyEN: "Your order has been updated" });
        await this.notificationsService.sendPrivate({ user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "تم تعديل الطلب", titleEN: "Order updated", body: "تم تعديل طلبك", bodyEN: "Your order has been updated" });
        if (updateOrderInput?.paymentMethod !== "Cash" && transaction.amount !== 0) {
            await this.transactionsService.updateTransaction({ ...transaction, order: order._id });
        }
        if (updatedOrder?.user?.image)
            updatedOrder.user.image = this.awsService.getUrl(updatedOrder.user.image);
        if (updatedOrder?.restaurant?.image)
            updatedOrder.restaurant.image = this.awsService.getUrl(updatedOrder.restaurant.image);
        return updatedOrder;
    }
    async state(stateInput) {
        const order = await this.OrdersModel.findById(stateInput.id);
        if (stateInput.state === "Pending") {
            await this.notificationsService.sendPrivate({ user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "فودي", titleEN: "Foody", body: "طلبك قيد الانتظار", bodyEN: "Your order is pending" });
        }
        else if (stateInput.state === "InProgress") {
            await this.notificationsService.sendPrivate({ user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "فودي", titleEN: "Foody", body: "طلبك قيد التحضير", bodyEN: "Your order is in progress" });
        }
        else if (stateInput.state === "InDelivery") {
            if (order?.driver)
                await this.notificationsService.sendPrivate({ driver: order.driver, order: order._id, restaurant: order.restaurant, type: "Private", title: "لديك طلب جديد", titleEN: "New order", body: "تم اضافة طلب جديد لديك", bodyEN: "You have new order" });
            await this.notificationsService.sendPrivate({ user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "فودي", titleEN: "Foody", body: "طلبك قيد التوصيل", bodyEN: "Your order is in delivery" });
        }
        else if (stateInput.state === "Completed") {
            await this.notificationsService.sendPrivate({ user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "فودي", titleEN: "Foody", body: "طلبك مكتمل", bodyEN: "Your order is completed" });
            if (order?.paymentMethod !== "Cash")
                await this.transactionsService.completeTransaction(order._id, order.user);
        }
        else if (stateInput.state === "Canceled") {
            await this.notificationsService.sendPrivate({ user: order.user, order: order._id, restaurant: order.restaurant, type: "Private", title: "فودي", titleEN: "Foody", body: "تم الغاء طلبك", bodyEN: "Your order is canceled" });
            if (order?.paymentMethod !== "Cash")
                await this.transactionsService.cancelTransaction(order._id, order.user);
        }
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
        const data = new Date().setDate(new Date().getDate() - 6);
        const ordersInWeek = await this.OrdersModel.aggregate([
            { $match: { createdAt: { $gt: new Date(data) } } },
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
        const transactions = await this.transactionsService.home();
        return { orders, recentlyOrders, week, status, users, recentlyUsers, rating, total, recentlyRating, restaurants, meals, drivers, transactions };
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
    async findUnread() {
        return this.OrdersModel.countDocuments({ readed: false });
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
    __param(9, (0, common_1.Inject)((0, common_1.forwardRef)(() => notifications_service_1.NotificationsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        meals_service_1.MealsService,
        promo_codes_service_1.PromoCodesService,
        wallets_service_1.WalletsService,
        users_service_1.UsersService,
        rates_service_1.RatesService,
        restaurants_service_1.RestaurantsService,
        drivers_service_1.DriversService,
        transactions_service_1.TransactionsService,
        notifications_service_1.NotificationsService,
        aws_service_1.AwsService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map