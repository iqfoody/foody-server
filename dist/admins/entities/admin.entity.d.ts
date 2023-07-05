import { adminTypes, publicStatus } from 'src/constants/types.type';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import { AdminPermission } from './admin-permissions.entity';
export declare class Admin {
    _id: string;
    wallet: string | Wallet;
    name: string;
    email: string;
    password: string;
    type: adminTypes;
    permissions: AdminPermission[];
    image?: string;
    state: publicStatus;
    createdAt?: any;
    updatedAt?: any;
    ip?: string;
    platform?: string;
    refreshToken?: string;
    deviceToken?: string;
}
