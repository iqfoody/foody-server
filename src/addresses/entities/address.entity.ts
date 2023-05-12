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
  city?: province;

  @Field({ nullable: true })
  address?: string;

  @Field({nullable: true})
  description?: string;

  @Field(()=> Float)
  latitude?: number;

  @Field(()=> Float)
  longitude?: number;

}
