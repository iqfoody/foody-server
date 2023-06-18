import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from 'src/models/orders.schema';
import { MealsModule } from 'src/meals/meals.module';
import { AwsModule } from 'src/aws/aws.module';
import { PromoCodesModule } from 'src/promo-codes/promo-codes.module';
import { WalletsModule } from 'src/wallets/wallets.module';
import { UsersModule } from 'src/users/users.module';
import { RatesModule } from 'src/rates/rates.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { DriversModule } from 'src/drivers/drivers.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Orders", schema: OrdersSchema }]),
    forwardRef(()=> MealsModule),
    forwardRef(()=> PromoCodesModule),
    forwardRef(()=> WalletsModule),
    forwardRef(()=> UsersModule),
    forwardRef(()=> RatesModule),
    forwardRef(()=> RestaurantsModule),
    forwardRef(()=> DriversModule),
    forwardRef(()=> TransactionsModule),
    forwardRef(()=> NotificationsModule),
    AwsModule,
    FirebaseModule
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
