import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { MealAddition } from './meal-addition.entity';
import { MealIngredient } from './meal-ingredient.entity';
import { mealStatus } from 'src/constants/types.type';
import { Tag } from 'src/tags/entities/tag.entity';
import { RestaurantCategory } from 'src/restaurant-categories/entities/restaurant-category.entity';
import { Category } from 'src/categories/entities/category.entity';

@ObjectType()
export class Meal {

  @Field(() => ID)
  _id: string;

  @Field(()=> Category, {nullable: true})
  category?: string | Category;

  @Field(()=> Restaurant)
  restaurant: string | Restaurant;

  @Field(()=> Tag, {nullable: true})
  tag?: string | Tag;

  @Field(()=> RestaurantCategory)
  restaurantCategory: string | RestaurantCategory;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field()
  description: string;

  @Field()
  descriptionEN: string;

  @Field({nullable: true})
  descriptionKR?: string;

  @Field({nullable: true})
  image?: string;

  @Field(()=> [MealAddition], {nullable: true})
  additions?: MealAddition[];

  @Field(()=> [MealIngredient], {nullable: true})
  ingredients?: MealIngredient[];

  @Field(()=> Int)
  price: number;

  @Field(()=> Int, {nullable: true})
  previousPrice?: number;

  @Field(()=> Int, {nullable: true})
  points?: number;

  @Field(()=> Int, {nullable: true})
  pointsBack?: number;

  @Field(()=> Int, {nullable: true})
  position?: number;

  @Field()
  state: mealStatus;
  
  @Field(()=> Date, { nullable: true})
  createdAt?: Date;

  @Field(()=> Date, { nullable: true})
  updatedAt?: Date;

}
