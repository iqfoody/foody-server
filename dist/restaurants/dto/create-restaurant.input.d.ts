import Upload from 'src/constants/Upload';
export declare class CreateRestaurantInput {
    title: string;
    titleEN: string;
    titleKR?: string;
    description: string;
    descriptionEN: string;
    descriptionKR?: string;
    image: Upload;
    time: number;
    deliveryPrice?: number;
    discount: number;
    minDiscount: number;
    maxDiscount: number;
    latitude: number;
    longitude: number;
}
