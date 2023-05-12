import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { publicStatus } from 'src/constants/types.type';

@ObjectType()
export class Category {
  
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field()
  image: string;

  @Field(()=> Int)
  position: number;

  @Field()
  state: publicStatus;
}
