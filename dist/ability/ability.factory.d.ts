import { InferSubjects, MongoAbility, ConditionsMatcher, FieldMatcher, MongoQuery } from '@casl/ability';
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
export declare enum Actions {
    Manage = "manage",
    Create = "create",
    Update = "update",
    Read = "read",
    Delete = "delete",
    Search = "search",
    Info = "info",
    UpdateInfo = "updateInfo",
    Add = "add",
    Edit = "edit",
    Remove = "remove",
    State = "state",
    Self = "self",
    Password = "password",
    Refresh = "refresh",
    Complete = "complete"
}
export type Subjects = InferSubjects<typeof User | typeof Admin | typeof Driver | typeof Address | typeof Advertisement | typeof Category | typeof Favorite | typeof Feedback | typeof Meal | typeof Order | typeof PromoCode | typeof Rate | typeof RestaurantCategory | typeof Restaurant | typeof Tag | typeof Wallet | typeof Transaction | typeof Setting> | 'all';
export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>;
export declare const conditionsMatcher: ConditionsMatcher<MongoQuery<import("@casl/ability/dist/types/types").AnyObject>>;
export declare const fieldMatcher: FieldMatcher;
export declare class AbilityFactory {
    defineAbility(user: ContextUser): AppAbility;
}
