import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@ObjectType()
export class RestaurantCategory {
  
  @Field(() => ID)
  _id: string;

  @Field(()=> String || Restaurant)
  restaurant: string | Restaurant;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field(() => Int)
  position: number;

}
