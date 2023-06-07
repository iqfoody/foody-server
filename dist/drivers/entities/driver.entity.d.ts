import { province, publicStatus } from 'src/constants/types.type';
import { Wallet } from 'src/wallets/entities/wallet.entity';
export declare class Driver {
    _id: string;
    wallet: string | Wallet;
    name: string;
    phoneNumber: string;
    country?: string;
    city: province;
    image?: string;
    state: publicStatus;
    createdAt?: any;
    updatedAt?: any;
    ip?: string;
    platform?: string;
    refreshToken?: string;
    deviceToken?: string;
}
