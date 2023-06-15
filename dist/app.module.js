"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const admins_module_1 = require("./admins/admins.module");
const drivers_module_1 = require("./drivers/drivers.module");
const firebase_module_1 = require("./firebase/firebase.module");
const addresses_module_1 = require("./addresses/addresses.module");
const advertisements_module_1 = require("./advertisements/advertisements.module");
const categories_module_1 = require("./categories/categories.module");
const favorites_module_1 = require("./favorites/favorites.module");
const feedbacks_module_1 = require("./feedbacks/feedbacks.module");
const meals_module_1 = require("./meals/meals.module");
const notifications_module_1 = require("./notifications/notifications.module");
const orders_module_1 = require("./orders/orders.module");
const promo_codes_module_1 = require("./promo-codes/promo-codes.module");
const rates_module_1 = require("./rates/rates.module");
const restaurant_categories_module_1 = require("./restaurant-categories/restaurant-categories.module");
const restaurants_module_1 = require("./restaurants/restaurants.module");
const tags_module_1 = require("./tags/tags.module");
const wallets_module_1 = require("./wallets/wallets.module");
const searches_module_1 = require("./searches/searches.module");
const transactions_module_1 = require("./transactions/transactions.module");
const settings_module_1 = require("./settings/settings.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'schema.gql',
                buildSchemaOptions: {
                    dateScalarMode: 'timestamp',
                },
                playground: false,
                context: ({ req, res }) => {
                    return { req, res };
                },
                path: 'foody',
            }),
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.dbURL),
            platform_express_1.MulterModule.register({
                dest: "./uploads",
                storage: multer_1.default.diskStorage({})
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            admins_module_1.AdminsModule,
            drivers_module_1.DriversModule,
            firebase_module_1.FirebaseModule,
            addresses_module_1.AddressesModule,
            advertisements_module_1.AdvertisementsModule,
            categories_module_1.CategoriesModule,
            favorites_module_1.FavoritesModule,
            feedbacks_module_1.FeedbacksModule,
            meals_module_1.MealsModule,
            notifications_module_1.NotificationsModule,
            orders_module_1.OrdersModule,
            promo_codes_module_1.PromoCodesModule,
            rates_module_1.RatesModule,
            restaurant_categories_module_1.RestaurantCategoriesModule,
            restaurants_module_1.RestaurantsModule,
            tags_module_1.TagsModule,
            wallets_module_1.WalletsModule,
            searches_module_1.SearchesModule,
            transactions_module_1.TransactionsModule,
            settings_module_1.SettingsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map