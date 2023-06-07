import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model, Query } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs'
import { adminTypes, publicStatus } from 'src/constants/types.type';
import { LoginInput } from 'src/auth/dto/login.input';
import { BadRequestException } from '@nestjs/common';
import { Wallets } from './wallets.schema';

export type AdminsDocument = Admins & Document;
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
    async login(this: IAdminsModel, loginAdmin: LoginInput) {
      const admin = await this.findOne<AdminsDocument>({ $and: [ {email: loginAdmin.username}, {state: "Active"}] });
      if(!admin) return;
      const verifyed = await admin.comparePassword(loginAdmin.password);
      if(!verifyed) throw new BadRequestException('password E0005');
      return admin;
    },
  },
})
export class Admins {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Wallets", required: [true, "wallet required"]})
  wallet: string | Wallets;

  @Prop({ required: [true, 'name field required'] })
  name: string;

  @Prop({ required: [true, "email E0001"], unique: [true, 'email E0011'], lowercase: [true] })
  email: string;

  @Prop({ required: [true, 'password E0004'], minlength: [6, 'password E0004']})
  password: string;

  @Prop({ required: [true, 'type field is required'],  })
  type: adminTypes;

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

export const AdminsSchema = SchemaFactory.createForClass(Admins);

AdminsSchema.index({email: 1});

AdminsSchema.pre('save', async function(next: Function) {
  const salt = await genSalt();
  const hashed = await hash(this.password, salt);
  this.password = hashed;
  next();
});

export type AdminsModelQuery = Query<any, AdminsDocument, IAdminsQueryHelpers> & IAdminsQueryHelpers;

export interface IAdminsQueryHelpers{
  admins: (this: AdminsModelQuery, query: string) => AdminsModelQuery
}

export interface IAdminsModel extends Model<AdminsDocument, IAdminsQueryHelpers> {
  login: (loginInput: LoginInput) => Promise<AdminsDocument | undefined>
}