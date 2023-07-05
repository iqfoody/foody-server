import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Order } from "src/orders/entities/order.entity";
import { TransactionsHomeResponse } from "src/transactions/entities/transactionsHomeResponse.entity";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class RatingResponse {

    @Field(()=> User)
    user: User;

    @Field(()=> Int)
    rate: number;
}

@ObjectType()
export class StatusResponse {

    @Field(()=> Int)
    Pending: number;

    @Field(()=> Int)
    InProgress: number;

    @Field(()=> Int)
    InDelivery: number;

    @Field(()=> Int)
    Completed: number;

    @Field(()=> Int)
    Canceled: number;

}

@ObjectType()
export class WeekResponse {

    @Field(()=> Int)
    d0: number;

    @Field(()=> Int)
    d1: number;

    @Field(()=> Int)
    d2: number;

    @Field(()=> Int)
    d3: number;

    @Field(()=> Int)
    d4: number;

    @Field(()=> Int)
    d5: number;

    @Field(()=> Int)
    d6: number;

}

@ObjectType()
export class HomeResponse {
    
    @Field(()=> Int)
    orders: number;

    @Field(()=> [Order], {nullable: true})
    recentlyOrders?: Order[];

    @Field(()=> WeekResponse)
    week: WeekResponse;

    @Field(()=> StatusResponse)
    status: StatusResponse;

    @Field(()=> Int)
    users: number;

    @Field(()=> [User], {nullable: true})
    recentlyUsers?: User[];

    @Field(()=> Float, {nullable: true})
    rating?: number;

    @Field(()=> Int, {nullable: true})
    total?: number;

    @Field(()=> [RatingResponse], {nullable: true})
    recentlyRating?: RatingResponse[];

    @Field(()=> Int, {nullable: true})
    restaurants?: number;

    @Field(()=> Int)
    meals: number;

    @Field(()=> Int)
    drivers: number;

    @Field(()=> TransactionsHomeResponse)
    transactions: TransactionsHomeResponse

}