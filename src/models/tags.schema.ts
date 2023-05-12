import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { publicStatus } from 'src/constants/types.type';

export type TagsDocument = Tags & Document;

@Schema()
export class Tags {

  @Prop({required: [true, "title required"]})
  title: string;

  @Prop({required: [true, "titleEN required"]})
  titleEN: string;

  @Prop()
  titleKR: string;

  @Prop()
  image: string;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  position: number;

  @Prop({default: "Active"})
  state: publicStatus;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);