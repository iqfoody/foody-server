import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'aws-sdk/clients/budgets';
import { advertisementsTypes, publicStatus } from 'src/constants/types.type';

@ObjectType()
export class Advertisement {
  
  @Field(() => ID)
  _id: string;

  @Field(() => ID, {nullable: true})
  target?: string;

  @Field({nullable: true})
  user?: string | User;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field()
  image: string;

  @Field({nullable: true})
  type?: advertisementsTypes;

  @Field(()=> Int)
  position: number;

  @Field()
  state: publicStatus;
  
}
