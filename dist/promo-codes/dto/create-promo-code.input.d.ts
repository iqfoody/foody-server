import { promoCodeTypes } from 'src/constants/types.type';
export declare class CreatePromoCodeInput {
    name: string;
    user?: string;
    type: promoCodeTypes;
    discount: number;
    public?: boolean;
    expire: Date;
}
