import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class MealAddition {

  @Field(()=> ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field(()=> Int)
  price: number;

}
