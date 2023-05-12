import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UsersResponse {

    @Field(()=> [User])
    data: User[];

    @Field(()=> Int)
    pages: number;

}