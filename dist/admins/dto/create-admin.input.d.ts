import { adminTypes } from 'src/constants/types.type';
export declare class CreateAdminInput {
    name: string;
    email: string;
    password: string;
    type: adminTypes;
    image?: string;
}
