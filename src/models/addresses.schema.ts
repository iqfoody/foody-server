import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { province } from 'src/constants/types.type';
import { Users } from './users.schema';

export type AddressesDocument = Addresses & Document;

@Schema()
export class Addresses {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: [true, "user required"]})
  user: string | Users;

  @Prop({required: [true, "title required"]})
  title: string;

  @Prop({default: "Iraq"})
  country: string;

  @Prop({default: "Baghdad"})
  city: province;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  description: string;

  @Prop({type: mongoose.Schema.Types.Decimal128, required: [true, "latitude required"]})
  latitude: number;

  @Prop({type: mongoose.Schema.Types.Decimal128, required: [true, "longitude required"]})
  longitude: number;
}

export const AddressesSchema = SchemaFactory.createForClass(Addresses);