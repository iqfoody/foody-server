import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Feedback {
  
  @Field(() => ID)
  _id: string;

  @Field()
  subject: string;

  @Field()
  message: string;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  phoneNumber?: string;

  @Field(()=> String || User, {nullable: true})
  user?: string | User;

}
