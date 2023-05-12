import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SearchUsersInput {

  @Field()
  query: string;

  @Field()
  page: number;
}
