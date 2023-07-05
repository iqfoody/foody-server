import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TransactionsHomeResponse {

    @Field(()=> Int)
    minusAmount: number;

    @Field(()=> Int)
    plusAmount: number;

    @Field(()=> Int)
    minusPoints: number;

    @Field(()=> Int)
    plusPoints: number;

}