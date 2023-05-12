import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field({nullable: true})
  image?: string;
  
}
