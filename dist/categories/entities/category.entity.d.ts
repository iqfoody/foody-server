import { publicStatus } from 'src/constants/types.type';
export declare class Category {
    _id: string;
    title: string;
    titleEN: string;
    titleKR?: string;
    image: string;
    position: number;
    state: publicStatus;
}
