import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model, Query } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs'
import { province, publicStatus } from 'src/constants/types.type';
import { LoginInput } from 'src/auth/dto/login.input';
import { BadRequestException } from '@nestjs/common';

export type DriversDocument = Drivers & Document;
@Schema({
  timestamps: true,
  methods: {
   async comparePassword(this: any, password: string){
      const isMatched = await compare(password, this.password);
      return isMatched;
    },
    async compareToken(this: any, refreshToken: string){
      const isMatched = await compare(refreshToken, this.refreshToken);
      return isMatched;
    },
  },
  statics: {
    async login(this: IDriversModel, loginInput: LoginInput) {
      const user = await this.findOne<DriversDocument>({ $and: [ {phoneNumber: loginInput.username}, {state: "Active"}] });
      if(!user) return;
      const verifyed = await user.comparePassword(loginInput.password);
      if(!verifyed) throw new BadRequestException('password E0005');
      return user;
    },
  },
})
export class Drivers {
  @Prop({ required: [true, 'name field required'] })
  name: string;

  @Prop({ length: [11, 'phoneNumber E0009'], required: [true, "phoneNumber E0009"], unique: [true, 'phoneNumber E0011'] })
  phoneNumber: string;

  @Prop({ required: [true, 'password E0004'], minlength: [6, 'password E0004']})
  password: string;

  @Prop({ default: 'Ireq' })
  country: string;

  @Prop({ required: [true, 'city field required'] })
  city: province;

  @Prop()
  image: string;

  @Prop({ default: "Active" })
  state: publicStatus;

  @Prop()
  ip: string;

  @Prop()
  platform: string;

  @Prop()
  deviceToken: string;

  @Prop()
  refreshToken: string;

  comparePassword: (password: string) => Promise<boolean>;

  compareToken:  (refreshToken: string) => Promise<boolean>;
}

export const DriversSchema = SchemaFactory.createForClass(Drivers);

DriversSchema.index({phoneNumber: 1});

DriversSchema.pre('save', async function(next: Function) {
  const salt = await genSalt();
  const hashed = await hash(this.password, salt);
  this.password = hashed;
  next();
});

export type DriversModelQuery = Query<any, DriversDocument, IDriversQueryHelpers> & IDriversQueryHelpers;

export interface IDriversQueryHelpers{
  drivers: (this: DriversModelQuery, query: string) => DriversModelQuery
}

export interface IDriversModel extends Model<DriversDocument, IDriversQueryHelpers> {
  login: (loginUserInput: LoginInput) => Promise<DriversDocument | undefined>
}