import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Rate {
  
  @Field(() => ID)
  _id: string;

  @Field(()=> String || User)
  user: string | User;

  @Field(()=> String || Restaurant)
  restaurant: string | Restaurant;

  @Field(() => Int)
  rate: number;

  @Field({nullable: true})
  description?: string;

}
