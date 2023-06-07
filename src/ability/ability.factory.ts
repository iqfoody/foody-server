import {
  InferSubjects,
  ExtractSubjectType,
  AbilityClass,
  AbilityBuilder,
  MongoAbility,
  PureAbility,
  ConditionsMatcher,
  buildMongoQueryMatcher,
  FieldMatcher,
  MongoQuery 
} from '@casl/ability';
import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { $ne, ne, $in, within, $eq, eq, createFactory, BuildMongoQuery } from '@ucast/mongo2js';
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


export enum Actions {
    Manage = 'manage',
    Create = 'create',
    Update = 'update',
    Read = 'read',
    Delete = 'delete',
    Search = 'search',
    Info = 'info',
    UpdateInfo = 'updateInfo',
    Add = "add",
    Edit = "edit",
    Remove = "remove",
    State = 'state',
    Self = 'self',
    Password = 'password',
    Refresh = 'refresh',
    Complete = 'complete'
}

export type Subjects = InferSubjects<
                                    typeof User |
                                    typeof Admin |
                                    typeof Driver |
                                    typeof Address | 
                                    typeof Advertisement |
                                    typeof Category |
                                    typeof Favorite |
                                    typeof Feedback | 
                                    typeof Meal |
                                    typeof Order |
                                    typeof PromoCode |
                                    typeof Rate |
                                    typeof RestaurantCategory |
                                    typeof Restaurant |
                                    typeof Tag |
                                    typeof Wallet |
                                    typeof Transaction |
                                    typeof Setting
                                    > | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>

export const conditionsMatcher = buildMongoQueryMatcher({ $eq }, { eq });
export const fieldMatcher: FieldMatcher = fields => field => fields.includes(field);

@Injectable()
export class AbilityFactory {
    defineAbility(user: ContextUser){
        // define roles...
        const {can, cannot, build} = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);
        // User...
        if(user.metadata === 'User'){
            // you can check user types...
            can([Actions.Info, Actions.UpdateInfo, Actions.Password, Actions.Refresh], User);
            can([Actions.Info, Actions.Edit, Actions.Add, Actions.Remove], Address);
            can([Actions.Info, Actions.Edit], Favorite);
            can(Actions.Read, Feedback);
            can([Actions.Info, Actions.Edit, Actions.Add, Actions.Remove], Order);
            can([Actions.Info, Actions.Edit], PromoCode);
            can(Actions.Add, Rate);

        // Driver...
        } else if(user.metadata === 'Driver'){
            // you can check driver types...
            can([Actions.Info, Actions.UpdateInfo, Actions.Password, Actions.Refresh], Driver);
            can([Actions.Read, Actions.Complete], Driver);

        } else if(user.metadata === 'Admin') {
            // Admin...
            if(user.type === "Admin"){
                can(Actions.Manage, 'all');

            // Data Entery...
            } else if(user.type === "Data Entery"){
                can([Actions.Read, Actions.Delete], Feedback);
                can(Actions.Manage, Admin);
            // Accounter...
            } else if(user.type === "Accounter"){

            // Human Resources...
            } else if(user.type === "Human Resources"){

            // Support...
            } else if(user.type === "Support"){

            // Store Keeper...
            } else if(user.type === "Store Keeper"){

            } 
        }


        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
            conditionsMatcher,
            fieldMatcher
        });
    }
}
