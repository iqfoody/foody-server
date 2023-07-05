import Upload from 'src/constants/Upload';
import { province, userTypes } from 'src/constants/types.type';
export declare class CreateUserInput {
    name: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    type?: userTypes;
    city?: province;
    image?: Upload;
    deviceToken?: string;
    ip?: string;
    platform?: string;
    refreshToken?: string;
}
