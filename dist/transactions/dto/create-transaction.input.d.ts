import { paymentMethodsType, procedureTypes, transactionTypes } from 'src/constants/types.type';
export declare class CreateTransactionInput {
    user?: string;
    admin?: string;
    driver?: string;
    order?: string;
    type: transactionTypes;
    procedure: procedureTypes;
    amount: number;
    description: string;
    paymentMethod?: paymentMethodsType;
    state?: string;
}
