import { province } from 'src/constants/types.type';
export declare class CreateDriverInput {
    name: string;
    phoneNumber: string;
    password: string;
    country?: string;
    city: province;
    image?: string;
}
