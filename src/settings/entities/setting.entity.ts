import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Setting {

  @Field(() => ID)
  _id: string;

  @Field({nullable: true})
  support: string;

}
