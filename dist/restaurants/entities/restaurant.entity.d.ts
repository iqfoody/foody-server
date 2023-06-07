import { publicStatus } from 'src/constants/types.type';
export declare class Restaurant {
    _id: string;
    title: string;
    titleEN: string;
    titleKR?: string;
    description: string;
    descriptionEN: string;
    descriptionKR?: string;
    image?: string;
    rating: number;
    rates: number;
    time: number;
    deliveryPrice: number;
    position: number;
    state: publicStatus;
    createdAt?: Date;
    updatedAt?: Date;
}
