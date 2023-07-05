import { Order } from "src/orders/entities/order.entity";
import { TransactionsHomeResponse } from "src/transactions/entities/transactionsHomeResponse.entity";
import { User } from "src/users/entities/user.entity";
export declare class RatingResponse {
    user: User;
    rate: number;
}
export declare class StatusResponse {
    Pending: number;
    InProgress: number;
    InDelivery: number;
    Completed: number;
    Canceled: number;
}
export declare class WeekResponse {
    d0: number;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    d5: number;
    d6: number;
}
export declare class HomeResponse {
    orders: number;
    recentlyOrders?: Order[];
    week: WeekResponse;
    status: StatusResponse;
    users: number;
    recentlyUsers?: User[];
    rating?: number;
    total?: number;
    recentlyRating?: RatingResponse[];
    restaurants?: number;
    meals: number;
    drivers: number;
    transactions: TransactionsHomeResponse;
}
