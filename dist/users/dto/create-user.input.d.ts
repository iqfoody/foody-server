import { province, userTypes } from 'src/constants/types.type';
export declare class CreateUserInput {
    name: string;
    phoneNumber: string;
    email?: string;
    password: string;
    type?: userTypes;
    city?: province;
    image?: string;
    deviceToken?: string;
    ip?: string;
    platform?: string;
    refreshToken?: string;
}
