import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMealAdditionInput {

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field(()=> Int)
  price: number;

}