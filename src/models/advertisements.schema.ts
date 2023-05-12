import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { advertisementsTypes, publicStatus } from 'src/constants/types.type';
import { Users } from './users.schema';

export type AdvertisementsDocument = Advertisements & Document;

@Schema()
export class Advertisements {
// advertisement for selected user...
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  user: string | Users;

  @Prop({required: [true, "title required"]})
  title: string;

  @Prop({required: [true, "titleEN required"]})
  titleEN: string;

  @Prop()
  titleKR: string;

  @Prop({required: [true, "image required"]})
  image: string;

  @Prop({default: null})
  type: advertisementsTypes;

  @Prop({type: mongoose.Schema.Types.ObjectId})
  target: string;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  position: number;

  @Prop({default: "Active"})
  state: publicStatus;
}

export const AdvertisementsSchema = SchemaFactory.createForClass(Advertisements);