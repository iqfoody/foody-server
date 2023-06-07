import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { paymentMethodsType, procedureTypes, transactionTypes } from 'src/constants/types.type';

export type TransactionsDocument = Transactions & Document;

@Schema({timestamps: true})
export class Transactions {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Users"})
  user: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Admins"})
  admin: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Drivers"})
  driver: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Orders"})
  order: string;

  @Prop({required: [true, "description required"]})
  description: string;

  @Prop({required: [true, "type required"]})
  type: transactionTypes;

  @Prop({required: [true, "proceduer required"]})
  procedure: procedureTypes;

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "amount required"]})
  amount: number;

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "previous required"]})
  previous: number;

  @Prop()
  paymentMethod: paymentMethodsType;

  @Prop({default: "Pending"})
  state: string;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);