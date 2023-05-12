import { advertisementsTypes } from 'src/constants/types.type';
import { CreateFavoriteInput } from './create-favorite.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateFavoriteInput extends PartialType(CreateFavoriteInput) {

// type -> Meal || Restaurant ...
  @Field()
  type: advertisementsTypes;

  @Field({nullable: true})
  restaurant?: string;

  @Field({nullable: true})
  meal?: string;
}
