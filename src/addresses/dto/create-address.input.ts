import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { province } from 'src/constants/types.type';

@InputType()
export class CreateAddressInput {

  @Field(() => ID)
  user: string;

  @Field()
  title: string;

  @Field({nullable: true})
  country?: string;

  @Field({nullable: true})
  city?: province;

  @Field({ nullable: true })
  address?: string;

  @Field({nullable: true})
  description?: string;

  @Field(()=> Float)
  latitude: number;

  @Field(()=> Float)
  longitude: number;
}
