import { province } from 'src/constants/types.type';
export declare class CreateAddressInput {
    user: string;
    title: string;
    country?: string;
    city?: province;
    address?: string;
    description?: string;
    latitude: number;
    longitude: number;
}
