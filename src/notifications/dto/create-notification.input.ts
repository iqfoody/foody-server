import { InputType, Field, ID } from '@nestjs/graphql';
import GraphQLUpload from 'src/Graphql/GraphQLUpload';
import Upload from 'src/constants/Upload';
import { notificationsTypes } from 'src/constants/types.type';

@InputType()
export class CreateNotificationInput {
  
  @Field(()=> ID, {nullable: true})
  user?: string;

  @Field(()=> ID, {nullable: true})
  driver?: string;

  @Field(()=> ID, {nullable: true})
  order?: string;

  @Field(()=> ID, {nullable: true})
  restaurant?: string;

  @Field(()=> ID, {nullable: true})
  meal?: string;

  @Field()
  type: notificationsTypes;

  @Field()
  title: string;

  @Field()
  titleEN: string;

  @Field({nullable: true})
  titleKR?: string;

  @Field()
  body: string;

  @Field()
  bodyEN: string;

  @Field({nullable: true})
  bodyKR?: string;

  @Field(()=> GraphQLUpload, {nullable: true})
  image?: Upload;

  @Field({nullable: true})
  submit?: string;

  @Field({nullable: true})
  dismiss?: string;

  @Field({nullable: true})
  action?: string;

  @Field({nullable: true})
  priority?: string;
}
