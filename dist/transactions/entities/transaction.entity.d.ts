import { Admin } from 'src/admins/entities/admin.entity';
import { paymentMethodsType, procedureTypes, transactionTypes } from 'src/constants/types.type';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Transaction {
    _id: string;
    user?: string | User;
    admin?: string | Admin;
    driver?: string | Driver;
    order?: string | Order;
    type: transactionTypes;
    procedure: procedureTypes;
    amount: number;
    previous: number;
    description: string;
    paymentMethod?: paymentMethodsType;
    state: string;
    createdAt?: Date;
    updatedAt?: Date;
}
