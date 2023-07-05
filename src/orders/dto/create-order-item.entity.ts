import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  
  @Field(() => ID)
  meal: string;

  @Field(()=> [String], {nullable: true})
  additions?: string[];

  @Field(()=> [String], {nullable: true})
  addIngredients?: string[];

  @Field(()=> [String], {nullable: true})
  removeIngredients?: string[];

  @Field(()=> Int)
  quantity: number;

  @Field({nullable: true})
  description?: string

}