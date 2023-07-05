import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AdminPermission {

    @Field()
    object: string;
  
    @Field(()=> [String])
    abilities: string[];

}