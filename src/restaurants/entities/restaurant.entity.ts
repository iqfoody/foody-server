import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { publicStatus } from 'src/constants/types.type';

@ObjectType()
export class Restaurant {
  
  @Field(() => ID)
  _id: string;

  @Field(()=> Category, {nullable: true})
  category?: string | Category;

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

  @Field(()=> Float)
  rating: number;

  @Field(()=> Int)
  rates: number;

  @Field(()=> Int)
  time: number;

  @Field(()=> Int)
  deliveryPrice: number;

  @Field(()=> Int)
  position: number;

  @Field()
  state: publicStatus;

  @Field(()=> Date, { nullable: true})
  createdAt?: Date;

  @Field(()=> Date, { nullable: true})
  updatedAt?: Date;

}
