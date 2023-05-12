import { CreateOrderItemInput } from './create-order-item.entity';
import { paymentMethodsType } from 'src/constants/types.type';
export declare class CreateOrderInput {
    user?: string;
    restaurant: string;
    address: string;
    meals: CreateOrderItemInput[];
    driver?: string;
    tableware?: boolean;
    details?: string;
    paymentMethod?: paymentMethodsType;
    promoCode?: string;
}
