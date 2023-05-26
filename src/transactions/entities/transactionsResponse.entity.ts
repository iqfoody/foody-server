import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transaction } from './transaction.entity';

@ObjectType()
export class TransactionResponse {

    @Field(() => [Transaction])
    data: Transaction[];

    @Field(()=> Int)
    pages: number;

}