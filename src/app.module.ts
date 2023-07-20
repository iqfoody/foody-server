import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { DriversModule } from './drivers/drivers.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AddressesModule } from './addresses/addresses.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { CategoriesModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { MealsModule } from './meals/meals.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { PromoCodesModule } from './promo-codes/promo-codes.module';
import { RatesModule } from './rates/rates.module';
import { RestaurantCategoriesModule } from './restaurant-categories/restaurant-categories.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TagsModule } from './tags/tags.module';
import { WalletsModule } from './wallets/wallets.module';
import { SearchesModule } from './searches/searches.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SettingsModule } from './settings/settings.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      playground: false,
      context: ({req, res}) => {
        return {req, res}
      },
      path: 'foody',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.dbURL),
    MulterModule.register({
      dest: "./uploads",
      storage: multer.diskStorage({})
    }),
    UsersModule,
    AuthModule,
    AdminsModule,
    DriversModule,
    FirebaseModule,
    AddressesModule,
    AdvertisementsModule,
    CategoriesModule,
    FavoritesModule,
    FeedbacksModule,
    MealsModule,
    NotificationsModule,
    OrdersModule,
    PromoCodesModule,
    RatesModule,
    RestaurantCategoriesModule,
    RestaurantsModule,
    TagsModule,
    WalletsModule,
    SearchesModule,
    TransactionsModule,
    SettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
