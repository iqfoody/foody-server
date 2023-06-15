import { TransactionsService } from './transactions.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { LimitEntity } from 'src/constants/limitEntity';
import { ResetAdminWallet } from 'src/admins/dto/reset-admin-wallet.input';
export declare class TransactionsResolver {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    createTransaction(createTransactionInput: CreateTransactionInput, context: any): Promise<any>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAmount(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findPoints(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAmountUser(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAmountDriver(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAllAdmin(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAmountAdmin(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findPointsAdmin(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findPointsUser(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findOne(id: string): Promise<any>;
    updateTransaction(updateTransactionInput: UpdateTransactionInput): Promise<string>;
    resetAdminWallet(resetAdminWallet: ResetAdminWallet, context: any): Promise<string>;
    removeTransaction(id: string): Promise<string>;
}
