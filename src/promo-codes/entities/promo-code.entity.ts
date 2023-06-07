import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { promoCodeTypes, publicStatus } from 'src/constants/types.type';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class PromoCode {
  
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field(()=> [String] || [User], {nullable: true})
  users?: string[] | User[];

  @Field(()=> User, {nullable: true})
  user?: string | User;

  @Field()
  type: promoCodeTypes;

  @Field(()=> Int)
  discount: number;

  @Field(()=> Int)
  usageTimes: number;

  @Field(()=> Boolean)
  isPublic: boolean;

  @Field(()=> Date)
  expire: Date;

  @Field()
  state: publicStatus;

  @Field(()=> Date, {nullable: true})
  createdAt?: Date;

  @Field(()=> Date, {nullable: true})
  updatedAt?: Date;

}
