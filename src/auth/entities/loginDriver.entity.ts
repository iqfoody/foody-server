import { Field, ObjectType } from "@nestjs/graphql";
import { Driver } from "src/drivers/entities/driver.entity";

@ObjectType()
export class LoginDriver {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field(()=> Driver)
    driver: Driver;
}