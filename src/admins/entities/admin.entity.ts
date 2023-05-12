import { ObjectType, Field, ID } from '@nestjs/graphql';
import { adminTypes, publicStatus } from 'src/constants/types.type';

@ObjectType()
export class Admin {

  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  type: adminTypes;

  @Field({nullable: true})
  image?: string;

  @Field()
  state: publicStatus;

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
