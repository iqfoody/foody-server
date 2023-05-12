import { Field, ObjectType } from "@nestjs/graphql";
import { Admin } from "src/admins/entities/admin.entity";

@ObjectType()
export class LoginAdmin {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field(()=> Admin)
    user: Admin;
}