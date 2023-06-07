import { userTypes, province, userStatus } from 'src/constants/types.type';
import { Wallet } from 'src/wallets/entities/wallet.entity';
export declare class User {
    _id: string;
    wallet: string | Wallet;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    type: userTypes;
    country?: string;
    city: province;
    approvedEmail?: boolean;
    approvedPhoneNumber?: boolean;
    image?: string;
    state: userStatus;
    createdAt?: any;
    updatedAt?: any;
    ip?: string;
    platform?: string;
    refreshToken?: string;
    deviceToken?: string;
}
