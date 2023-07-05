import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AdminPermission } from 'src/admins/entities/admin-permissions.entity';

@ObjectType()
export class ContextUser {

  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field({nullable: true})
  phoneNumber?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  type: string;

  @Field()
  metadata: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  deviceToken?: string;

  @Field(() => [AdminPermission])
  permissions: AdminPermission[];
  
}

