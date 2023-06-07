import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {

  @Prop()
  support: string;

}

export const SettingsSchema = SchemaFactory.createForClass(Settings);