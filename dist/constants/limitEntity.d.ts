import { storeOrdersStatus } from './types.type';
export declare class LimitEntity {
    page: number;
    limit: number;
    orderBy?: string;
    state?: storeOrdersStatus;
    user?: string;
}
