import { notificationsStatus, notificationsTypes } from 'src/constants/types.type';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Meal } from 'src/meals/entities/meal.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Notification {
    _id: string;
    user?: string | User;
    driver?: string | Driver;
    order?: string | Order;
    restaurant?: string | Restaurant;
    meal?: string | Meal;
    type: notificationsTypes;
    title: string;
    titleEN: string;
    titleKR?: string;
    body: string;
    bodyEN: string;
    bodyKR?: string;
    image?: string;
    state: notificationsStatus;
    createdAt?: Date;
    updatedAt?: Date;
    submit?: string;
    dismiss?: string;
    action?: string;
    priority?: string;
}
