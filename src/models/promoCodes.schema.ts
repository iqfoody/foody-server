import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { promoCodeTypes, publicStatus } from 'src/constants/types.type';
import { Users } from './users.schema';

export type PromoCodesDocument = PromoCodes & Document;

@Schema({timestamps: true})
export class PromoCodes {

  @Prop({required: [true, "name required"], unique: [true, "name unique"]})
  name: string;

  @Prop({type: [mongoose.Schema.Types.ObjectId], ref: "Users", default: []})
  users: string[] | Users[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Users"})
  user: string | Users;

  @Prop({default: "Percent"})
  type: promoCodeTypes;

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "Discount required"]})
  discount: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  usageTimes: number;

  @Prop({type: mongoose.Schema.Types.Boolean, default: true})
  isPublic: boolean;

  @Prop({type: mongoose.Schema.Types.Date, required: [true, "expire required"]})
  expire: Date;

  @Prop({default: "Active"})
  state: publicStatus;
}

export const PromoCodesSchema = SchemaFactory.createForClass(PromoCodes);