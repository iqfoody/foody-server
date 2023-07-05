import mongoose, { Document } from 'mongoose';
import { orderStatus, orderTypes, paymentMethodsType, promoCodeTypes } from 'src/constants/types.type';
import { Users } from './users.schema';
import { Restaurants } from './restaurants.schema';
import { Meals } from './meals.schema';
import { Addresses } from './addresses.schema';
import { MealAdditions } from './meals.schema';
import { MealIngredients } from './meals.schema';
import { Drivers } from './drivers.schema';
import { OrderMealAddition } from 'src/orders/entities/order-meal-addition.entity';
export type OrdersDocument = Orders & Document;
export declare class OrderItemAddition {
    addition: MealAdditions;
    quantity: number;
}
export declare const OrderItemAdditionSchema: mongoose.Schema<OrderItemAddition, mongoose.Model<OrderItemAddition, any, any, any, mongoose.Document<unknown, any, OrderItemAddition> & Omit<OrderItemAddition & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OrderItemAddition, mongoose.Document<unknown, {}, mongoose.FlatRecord<OrderItemAddition>> & Omit<mongoose.FlatRecord<OrderItemAddition> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export declare class OrderItems {
    meal: string | Meals;
    additions: OrderMealAddition[];
    addIngredients: MealIngredients[];
    removeIngredients: MealIngredients[];
    quantity: number;
    description: string;
}
export declare const OrderItemSchema: mongoose.Schema<OrderItems, mongoose.Model<OrderItems, any, any, any, mongoose.Document<unknown, any, OrderItems> & Omit<OrderItems & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OrderItems, mongoose.Document<unknown, {}, mongoose.FlatRecord<OrderItems>> & Omit<mongoose.FlatRecord<OrderItems> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export declare class Orders {
    user: string | Users;
    restaurant: string | Restaurants;
    address: string | Addresses;
    meals: OrderItems[];
    driver: string | Drivers;
    totalPrice: number;
    type: orderTypes;
    deliveryPrice: number;
    recievedPrice: number;
    tableware: boolean;
    hasRating: boolean;
    details: string;
    paymentMethod: paymentMethodsType;
    state: orderStatus;
    promoCode: string;
    promoCodeDiscount: number;
    totalDiscount: number;
    discount: number;
    discountType: promoCodeTypes;
    walletAmount: number;
    walletPoints: number;
    pointsBack: number;
    totalPoints: number;
    price: number;
    no: number;
    readed: boolean;
}
export declare const OrdersSchema: mongoose.Schema<Orders, mongoose.Model<Orders, any, any, any, mongoose.Document<unknown, any, Orders> & Omit<Orders & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Orders, mongoose.Document<unknown, {}, mongoose.FlatRecord<Orders>> & Omit<mongoose.FlatRecord<Orders> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
