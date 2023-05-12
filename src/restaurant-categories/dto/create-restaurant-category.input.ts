import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantCategoryInput {
  
  @Field(()=> ID)
  restaurant: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

}
