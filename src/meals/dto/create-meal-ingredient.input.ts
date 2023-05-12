import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMealIngredientInput {

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

}
