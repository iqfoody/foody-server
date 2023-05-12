import { CreateRestaurantCategoryInput } from './create-restaurant-category.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRestaurantCategoryInput extends PartialType(CreateRestaurantCategoryInput) {
  @Field(() => ID)
  id: string;
}
