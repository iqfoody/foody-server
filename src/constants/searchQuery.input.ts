import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SearchInput {

  @Field()
  query: string;

  @Field(()=> Int, {nullable: true})
  page?: number;
}
