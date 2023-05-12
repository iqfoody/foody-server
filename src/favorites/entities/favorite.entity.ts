import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Favorite {

  @Field(() => ID)
  _id: string;
  
  @Field(()=> String || User)
  user: string | User;

  @Field(()=> String || [Restaurant], {nullable: true})
  restaurants?: string | Restaurant[];

  @Field(()=> String || [Meal], {nullable: true})
  meals?: string | Meal[];
}
