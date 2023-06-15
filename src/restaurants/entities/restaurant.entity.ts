import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { publicStatus } from 'src/constants/types.type';

@ObjectType()
export class Restaurant {
  
  @Field(() => ID)
  _id: string;

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

  // -> after update 1...

  @Field(()=> Int)
  discount: number;

  @Field(()=> Int)
  minDiscount: number;

  @Field(()=> Int)
  maxDiscount: number;

  @Field(()=> Float)
  latitude: number;

  @Field(()=> Float)
  longitude: number;

}
