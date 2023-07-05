import { InputType, Field } from '@nestjs/graphql';
import GraphQLUpload from 'src/Graphql/GraphQLUpload';
import Upload from 'src/constants/Upload';
import { province, userTypes } from 'src/constants/types.type';

@InputType()
export class CreateUserInput {

  @Field()
  name: string;

  @Field({nullable: true})
  phoneNumber?: string;

  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  password?: string;

  @Field({nullable: true})
  type?: userTypes;

  @Field({nullable: true})
  city?: province;

  @Field(()=> GraphQLUpload, {nullable: true})
  image?: Upload;

  @Field({nullable: true})
  deviceToken?: string;

  @Field({nullable: true})
  ip?: string;

  @Field({nullable: true})
  platform?: string;

  @Field({nullable: true})
  refreshToken?: string;

}
