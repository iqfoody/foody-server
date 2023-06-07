import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { advertisementsTypes, publicStatus } from 'src/constants/types.type';
import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Advertisement {
  
  @Field(() => ID)
  _id: string;

  @Field(() => Meal, {nullable: true})
  meal?: string | Meal;

  @Field(() => Restaurant, {nullable: true})
  restaurant?: string | Restaurant;

  @Field(()=> User, {nullable: true})
  user?: string | User;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field()
  image: string;

  @Field({nullable: true})
  type?: advertisementsTypes;

  @Field(()=> Int)
  position: number;

  @Field()
  state: publicStatus;
  
}
