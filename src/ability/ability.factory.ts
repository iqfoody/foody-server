import { InferSubjects, ExtractSubjectType, AbilityClass, AbilityBuilder, MongoAbility, PureAbility, buildMongoQueryMatcher, FieldMatcher, MongoQuery } from '@casl/ability';
import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { $eq, eq } from '@ucast/mongo2js';
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


export enum Actions {
    Manage = 'manage',
    Create = 'Create',
    Update = 'Update',
    Read = 'Read',
    Delete = 'Delete',
}

export type Subjects = InferSubjects<
                                    typeof User | "User" |
                                    typeof Admin | "Admin" |
                                    typeof Driver | "Driver" |
                                    typeof Address | "Address" |
                                    typeof Advertisement | "Advertisement" |
                                    typeof Category | "Category" |
                                    typeof Favorite | "Favorite" |
                                    typeof Feedback | "Feedback" |
                                    typeof Meal | "Meal" |
                                    typeof Order | "Order" |
                                    typeof PromoCode | "PromoCode" |
                                    typeof Rate | "Rate" |
                                    typeof RestaurantCategory | "RestaurantCategory" |
                                    typeof Restaurant | "Restaurant" |
                                    typeof Tag | "Tag" |
                                    typeof Wallet | "Wallet" |
                                    typeof Transaction | "Transaction" |
                                    typeof Setting | "Setting" |
                                    typeof Notification | "Notification" |
                                    "Home"
                                    > | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>

export const conditionsMatcher = buildMongoQueryMatcher({ $eq }, { eq });
export const fieldMatcher: FieldMatcher = fields => field => fields.includes(field);

@Injectable()
export class AbilityFactory {
    defineAbility(user: ContextUser){
        // define roles...
        const {can, cannot, build} = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);
        if(user.metadata === 'Admin') {
            // Admin...
            if(user.type === "Admin"){
                can(Actions.Manage, 'all');
            // Sub Admin...
            } else if(user.type === "Sub Admin"){
                can(Actions.Read, "Notification")
                user.permissions.map(item => 
                    can(item.abilities as any, item.object as any)    
                )
            }
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
            conditionsMatcher,
            fieldMatcher
        });
    }
}
