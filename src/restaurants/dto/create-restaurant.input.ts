import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {

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

  @Field(()=> Int)
  time: number;

  @Field(()=> Int, {nullable: true})
  deliveryPrice?: number;

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
