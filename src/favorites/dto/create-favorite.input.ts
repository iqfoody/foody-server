import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateFavoriteInput {

  @Field(()=> ID)
  user: string;

}
