import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { province } from 'src/constants/types.type';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Address {

  @Field(() => ID)
  _id: string;

  @Field(() => String || User)
  user: string | User;

  @Field()
  title: string;

  @Field({nullable: true})
  country?: string;

  @Field({nullable: true})
  phoneNumber?: string;

  @Field({nullable: true})
  city?: province;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  building?: string;

  @Field({ nullable: true })
  apartment?: string;

  @Field({nullable: true})
  description?: string;

  @Field(()=> Float, {nullable: true})
  latitude?: number;

  @Field(()=> Float, {nullable: true})
  longitude?: number;

}
