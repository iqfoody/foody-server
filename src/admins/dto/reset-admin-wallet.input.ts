import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class ResetAdminWallet {

  @Field(()=> ID)
  admin: string;

  @Field()
  type: string;

}