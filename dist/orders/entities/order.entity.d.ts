import { Address } from 'src/addresses/entities/address.entity';
import { orderStatus, orderTypes, paymentMethodsType } from 'src/constants/types.type';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    _id: string;
    user: string | User;
    restaurant: string | Restaurant;
    address: string | Address;
    meals: OrderItem[];
    driver?: string | Driver;
    totalPrice: number;
    type: orderTypes;
    deliveryPrice: number;
    tableware: boolean;
    details: string;
    paymentMethod: paymentMethodsType;
    state: orderStatus;
    promoCode?: number;
    discount?: number;
    percent?: number;
    walletAmount?: number;
    walletPoint?: number;
}
