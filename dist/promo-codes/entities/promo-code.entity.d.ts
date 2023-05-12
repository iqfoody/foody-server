import { promoCodeTypes, publicStatus } from 'src/constants/types.type';
import { User } from 'src/users/entities/user.entity';
export declare class PromoCode {
    _id: string;
    name: string;
    users?: string[] | User[];
    user?: string | User;
    type: promoCodeTypes;
    discount: number;
    public: boolean;
    expire: Date;
    state: publicStatus;
}
