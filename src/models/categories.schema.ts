import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { publicStatus } from 'src/constants/types.type';

export type CategoriesDocument = Categories & Document;

@Schema()
export class Categories {

  @Prop({required: [true, "title required"]})
  title: string;

  @Prop({required: [true, "titleEN required"]})
  titleEN: string;

  @Prop()
  titleKR: string;

  @Prop({required: [true, "image required"]})
  image: string;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  position: number;

  @Prop({default: "Active"})
  state: publicStatus;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);