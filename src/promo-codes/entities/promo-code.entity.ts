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

  @Field(()=> String || User, {nullable: true})
  user?: string | User;

  @Field()
  type: promoCodeTypes;

  @Field(()=> Int)
  discount: number;

  @Field(()=> Boolean)
  public: boolean;

  @Field(()=> Date)
  expire: Date;

  @Field()
  state: publicStatus;

}
