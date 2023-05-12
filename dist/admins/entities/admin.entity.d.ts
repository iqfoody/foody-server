import { adminTypes, publicStatus } from 'src/constants/types.type';
export declare class Admin {
    _id: string;
    name: string;
    email: string;
    password: string;
    type: adminTypes;
    image?: string;
    state: publicStatus;
    createdAt?: any;
    updatedAt?: any;
    ip?: string;
    platform?: string;
    refreshToken?: string;
    deviceToken?: string;
}
