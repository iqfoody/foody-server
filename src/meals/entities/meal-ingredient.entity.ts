import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MealIngredient {

  @Field(()=> ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

}
