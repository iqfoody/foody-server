import { province, publicStatus } from 'src/constants/types.type';
export declare class Driver {
    _id: string;
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
