import { province } from 'src/constants/types.type';
export declare class CreateAddressInput {
    user: string;
    title: string;
    country?: string;
    phoneNumber?: string;
    city?: province;
    address?: string;
    building?: string;
    apartment?: string;
    description?: string;
    latitude: number;
    longitude: number;
}
