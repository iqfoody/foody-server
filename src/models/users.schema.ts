import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model, Query } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs'
import { province, userStatus, userTypes } from 'src/constants/types.type';
import { LoginInput } from 'src/auth/dto/login.input';
import { BadRequestException } from '@nestjs/common';
import { Wallets } from './wallets.schema';

export type UsersDocument = Users & Document;
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
    async login(this: IUsersModel, loginUserInput: LoginInput) {
      const user = await this.findOne<UsersDocument>({ $and: [ {phoneNumber: loginUserInput.username}, {state: "Active"}] }, {name: 1, wallet: 1, phoneNumber: 1, type: 1, city: 1, image: 1, refreshToken: 1, password: 1}).populate({path: "wallet", select: {points: 1, amount: 1, _id: 0}});
      if(!user) return;
      const verifyed = await user.comparePassword(loginUserInput.password);
      if(!verifyed) throw new BadRequestException('password E0005');
      return user;
    },
  },
})
export class Users {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Wallets", required: [true, "wallet required"]})
  wallet: string | Wallets;

  @Prop({ required: [true, 'name field required'] })
  name: string;

  @Prop({ length: [14, 'phoneNumber E0009'], required: [true, "phoneNumber E0009"], unique: [true, 'phoneNumber E0011'] })
  phoneNumber: string;

  @Prop({ lowercase: true })
  email: string;

  @Prop({ required: [true, 'password E0004'], minlength: [6, 'password E0004']})
  password: string;

  @Prop({ default: "Bronze" })
  type: userTypes;

  @Prop({ default: 'Ireq' })
  country: string;

  @Prop({ default: "Baghdad" })
  city: province;

  @Prop({ default: false })
  approvedEmail: boolean;

  @Prop({ default: false })
  approvedPhoneNumber: boolean;

  @Prop()
  image: string;

  @Prop({ default: "Active" })
  state: userStatus;

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

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.index({phoneNumber: 1});

UsersSchema.pre('save', async function(next: Function) {
  const salt = await genSalt();
  const hashed = await hash(this.password, salt);
  this.password = hashed;
  next();
});

export type UsersModelQuery = Query<any, UsersDocument, IUsersQueryHelpers> & IUsersQueryHelpers;

export interface IUsersQueryHelpers{
  users: (this: UsersModelQuery, query: string) => UsersModelQuery
}

export interface IUsersModel extends Model<UsersDocument, IUsersQueryHelpers> {
  login: (loginUserInput: LoginInput) => Promise<UsersDocument | undefined>
}