import { InputType, Field } from '@nestjs/graphql';
import GraphQLUpload from 'src/Graphql/GraphQLUpload';
import Upload from 'src/constants/Upload';
import { AdminPermissionsInput } from './create-admin-permissions.input';

@InputType()
export class CreateAdminInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [AdminPermissionsInput])
  permissions: AdminPermissionsInput[];

  @Field(()=> GraphQLUpload, {nullable: true})
  image?: Upload;
}
