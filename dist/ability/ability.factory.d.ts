import { InferSubjects, MongoAbility, FieldMatcher, MongoQuery } from '@casl/ability';
import { User } from "src/users/entities/user.entity";
import { Admin } from 'src/admins/entities/admin.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { ContextUser } from 'src/constants/contextUser.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { Advertisement } from 'src/advertisements/entities/advertisement.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Meal } from 'src/meals/entities/meal.entity';
import { Order } from 'src/orders/entities/order.entity';
import { PromoCode } from 'src/promo-codes/entities/promo-code.entity';
import { Rate } from 'src/rates/entities/rate.entity';
import { RestaurantCategory } from 'src/restaurant-categories/entities/restaurant-category.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Setting } from 'src/settings/entities/setting.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
export declare enum Actions {
    Manage = "manage",
    Create = "Create",
    Update = "Update",
    Read = "Read",
    Delete = "Delete"
}
export type Subjects = InferSubjects<typeof User | "User" | typeof Admin | "Admin" | typeof Driver | "Driver" | typeof Address | "Address" | typeof Advertisement | "Advertisement" | typeof Category | "Category" | typeof Favorite | "Favorite" | typeof Feedback | "Feedback" | typeof Meal | "Meal" | typeof Order | "Order" | typeof PromoCode | "PromoCode" | typeof Rate | "Rate" | typeof RestaurantCategory | "RestaurantCategory" | typeof Restaurant | "Restaurant" | typeof Tag | "Tag" | typeof Wallet | "Wallet" | typeof Transaction | "Transaction" | typeof Setting | "Setting" | typeof Notification | "Notification" | "Home"> | 'all';
export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>;
export declare const conditionsMatcher: import("@casl/ability").ConditionsMatcher<MongoQuery<import("@casl/ability/dist/types/types").AnyObject>>;
export declare const fieldMatcher: FieldMatcher;
export declare class AbilityFactory {
    defineAbility(user: ContextUser): AppAbility;
}
