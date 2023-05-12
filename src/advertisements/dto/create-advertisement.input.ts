import { InputType, Field, ID } from '@nestjs/graphql';
import { advertisementsTypes } from 'src/constants/types.type';

@InputType()
export class CreateAdvertisementInput {
  
  @Field(() => ID, {nullable: true})
  target?: string;

  @Field(() => ID, {nullable: true})
  user?: string;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field({nullable: true})
  image?: string;

  @Field({nullable: true})
  type?: advertisementsTypes;

}
