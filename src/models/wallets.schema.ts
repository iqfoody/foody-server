import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type WalletsDocument = Wallets & Document;

@Schema()
export class Wallets {

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  points: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  amount: number;
}

export const WalletsSchema = SchemaFactory.createForClass(Wallets);