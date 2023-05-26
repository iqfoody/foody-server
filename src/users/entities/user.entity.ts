import { ObjectType, Field, ID } from '@nestjs/graphql';
import { userTypes, province, userStatus } from 'src/constants/types.type';
import { Wallet } from 'src/wallets/entities/wallet.entity';

@ObjectType()
export class User {

  @Field(() => ID)
  _id: string;

  @Field(() => Wallet)
  wallet: string | Wallet;

  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  password: string;

  @Field()
  type: userTypes;

  @Field({nullable: true})
  country?: string;

  @Field()
  city: province;

  @Field({nullable: true})
  approvedEmail?: boolean;

  @Field({nullable: true})
  approvedPhoneNumber?: boolean;

  @Field({nullable: true})
  image?: string;

  @Field()
  state: userStatus;

  @Field(()=> Date, {nullable: true})
  createdAt?: any;

  @Field(()=> Date, {nullable: true})
  updatedAt?: any;

  @Field({ nullable: true })
  ip?: string;

  @Field({ nullable: true })
  platform?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  deviceToken?: string;
  
}

