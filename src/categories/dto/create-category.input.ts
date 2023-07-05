import { InputType, Field } from '@nestjs/graphql';
import GraphQLUpload from 'src/Graphql/GraphQLUpload';
import Upload from 'src/constants/Upload';

@InputType()
export class CreateCategoryInput {
  
  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field(()=> GraphQLUpload)
  image: Upload;

}
