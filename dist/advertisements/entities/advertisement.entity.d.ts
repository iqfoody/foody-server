import { User } from 'aws-sdk/clients/budgets';
import { advertisementsTypes, publicStatus } from 'src/constants/types.type';
export declare class Advertisement {
    _id: string;
    target?: string;
    user?: string | User;
    title: string;
    titleEN: string;
    titleKR?: string;
    image: string;
    type?: advertisementsTypes;
    position: number;
    state: publicStatus;
}
