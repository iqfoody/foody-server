import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Notification } from "./notification.entity";

@ObjectType()
export class NotificationsResponse {

    @Field(()=> [Notification])
    data: Notification[];

    @Field(()=> Int)
    pages: number;

    @Field(()=> Int, {nullable: true})
    orders?: number;

}