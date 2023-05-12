import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { publicStatus } from 'src/constants/types.type';

@ObjectType()
export class Tag {
  
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field({nullable: true})
  image?: string;
  
  @Field(()=> Int)
  position: number;

  @Field()
  state: publicStatus;
}
