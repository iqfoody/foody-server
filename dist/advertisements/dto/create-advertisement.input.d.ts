import { advertisementsTypes } from 'src/constants/types.type';
export declare class CreateAdvertisementInput {
    target?: string;
    user?: string;
    title: string;
    titleEN: string;
    titleKR?: string;
    image?: string;
    type?: advertisementsTypes;
}
