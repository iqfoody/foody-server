import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Login {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field(()=> User)
    user: User;
}