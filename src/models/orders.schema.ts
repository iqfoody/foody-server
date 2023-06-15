import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { orderStatus, orderTypes, paymentMethodsType, promoCodeTypes, weekDays } from 'src/constants/types.type';
import { Users } from './users.schema';
import { Restaurants } from './restaurants.schema';
import { MealAdditionsSchema, MealIngredientsSchema, Meals } from './meals.schema';
import { Addresses } from './addresses.schema';
import { MealAdditions } from './meals.schema';
import { MealIngredients } from './meals.schema';
import { Drivers } from './drivers.schema';
import { OrderMealAddition } from 'src/orders/entities/order-meal-addition.entity';

export type OrdersDocument = Orders & Document;

@Schema()
export class OrderItemAddition {

  @Prop({type: MealAdditionsSchema})
  addition: MealAdditions;

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "Quantity required"], minlength: [1, "Min quantity 1"]})
  quantity: number;
}
export const OrderItemAdditionSchema = SchemaFactory.createForClass(OrderItemAddition);

@Schema()
export class OrderItems {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Meals', required: [true, "Meals required"]})
  meal: string | Meals;

  @Prop({type: [OrderItemAdditionSchema]})
  additions: OrderMealAddition[];

  @Prop({type: [MealIngredientsSchema]})
  addIngredients: MealIngredients[];

  @Prop({type: [MealIngredientsSchema]})
  removeIngredients: MealIngredients[];

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "Quantity required"], minlength: [1, "Min quantity 1"]})
  quantity: number;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItems);

@Schema({timestamps: true})
export class Orders {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: [true, "user required"]})
  user: string | Users;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants', required: [true, "Restaurants required"]})
  restaurant: string | Restaurants;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Addresses', required: [true, "Addresses required"]})
  address: string | Addresses;

  @Prop({type: [OrderItemSchema], required: [true, "Meals required"]})
  meals: OrderItems[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Drivers'})
  driver: string | Drivers;

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "Total price required"], minlength: [1, "Min total price 1"]})
  totalPrice: number;

  @Prop({default: "Auto"})
  type: orderTypes;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  deliveryPrice: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  recievedPrice: number;

  @Prop({type: mongoose.Schema.Types.Boolean, default: true})
  tableware: boolean;

  @Prop({type: mongoose.Schema.Types.Boolean, default: false})
  hasRating: boolean;

  @Prop()
  details: string;

  @Prop({default: "Cash"})
  paymentMethod: paymentMethodsType;

  @Prop({default: "Pending"})
  state: orderStatus;

  @Prop()
  promoCode: string;

  @Prop({type: mongoose.Schema.Types.Number})
  discount: number;

  @Prop()
  discountType: promoCodeTypes;
  
  //! delete
  @Prop({type: mongoose.Schema.Types.Number})
  walletAmount: number;

  @Prop({type: mongoose.Schema.Types.Number})
  walletPoints: number;
  //! end delete.

  @Prop({type: mongoose.Schema.Types.Number})
  pointsBack: number;

  @Prop({type: mongoose.Schema.Types.Number, minlength: [0, "Min total price 1"]})
  totalPoints: number;

  @Prop({type: mongoose.Schema.Types.Number, minlength: [0, "Min total price 1"]})
  price: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  no: number;

}

export const OrdersSchema = SchemaFactory.createForClass(Orders);