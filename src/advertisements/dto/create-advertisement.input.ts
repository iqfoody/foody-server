import { InputType, Field, ID } from '@nestjs/graphql';
import GraphQLUpload from 'src/Graphql/GraphQLUpload';
import Upload from 'src/constants/Upload';
import { advertisementsTypes } from 'src/constants/types.type';
import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@InputType()
export class CreateAdvertisementInput {
  
  @Field(() => ID, {nullable: true})
  meal?: string | Meal;

  @Field(() => ID, {nullable: true})
  restaurant?: string | Restaurant;

  @Field(() => ID, {nullable: true})
  user?: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field(()=> GraphQLUpload)
  image?: Upload;

  @Field({nullable: true})
  type?: advertisementsTypes;

}
