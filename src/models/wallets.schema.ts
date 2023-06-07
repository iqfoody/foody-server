import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type WalletsDocument = Wallets & Document;

@Schema({timestamps: true})
export class Wallets {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Users"})
  user: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Drivers"})
  driver: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Admins"})
  admin: string;

  @Prop({type: mongoose.Schema.Types.Number, default: 0, minlength: [0, "Minus points is zero"]})
  points: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  amount: number;
}

export const WalletsSchema = SchemaFactory.createForClass(Wallets);