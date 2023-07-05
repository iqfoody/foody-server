import { InputType, Field } from '@nestjs/graphql';
import GraphQLUpload from 'src/Graphql/GraphQLUpload';
import Upload from 'src/constants/Upload';
import { province } from 'src/constants/types.type';

@InputType()
export class CreateDriverInput {

  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  password: string;

  @Field({nullable: true})
  country?: string;

  @Field()
  city: province;

  @Field(()=> GraphQLUpload, {nullable: true})
  image?: Upload;
}
