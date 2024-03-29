import { province } from 'src/constants/types.type';
import { User } from 'src/users/entities/user.entity';
export declare class Address {
    _id: string;
    user: string | User;
    title: string;
    country?: string;
    phoneNumber?: string;
    city?: province;
    address?: string;
    building?: string;
    apartment?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
}
