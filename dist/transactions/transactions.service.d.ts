import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { AdminsService } from 'src/admins/admins.service';
import { UsersService } from 'src/users/users.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { OrdersService } from 'src/orders/orders.service';
import { Model } from 'mongoose';
import { TransactionsDocument } from 'src/models/transactions.schema';
import { LimitEntity } from 'src/constants/limitEntity';
import { AwsService } from 'src/aws/aws.service';
import { ResetAdminWallet } from 'src/admins/dto/reset-admin-wallet.input';
export declare class TransactionsService {
    private TransactionsModel;
    private ordersService;
    private adminsService;
    private usersService;
    private walletsService;
    private readonly awsService;
    constructor(TransactionsModel: Model<TransactionsDocument>, ordersService: OrdersService, adminsService: AdminsService, usersService: UsersService, walletsService: WalletsService, awsService: AwsService);
    createTransaction(createTransactionInput: CreateTransactionInput): Promise<void>;
    cancelTransaction(order: string, user: string): Promise<string>;
    completeTransaction(order: string, user: string): Promise<string>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findPoints(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAmount(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findPointsUser(limitEntity: LimitEntity): Promise<{
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
    create(createTransactionInput: CreateTransactionInput, admin: boolean): Promise<any>;
    resetAdmin(admin: string, resetAdminWallet: ResetAdminWallet): Promise<string>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTransactionInput: UpdateTransactionInput): Promise<string>;
    remove(id: string): Promise<string>;
}
