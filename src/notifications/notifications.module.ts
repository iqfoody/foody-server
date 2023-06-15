import { Module, forwardRef } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsController } from './notifications.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AwsModule } from 'src/aws/aws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsSchema } from 'src/models/notifications.schema';
import { MealsModule } from 'src/meals/meals.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersModule } from 'src/users/users.module';
import { DriversModule } from 'src/drivers/drivers.module';
import { OrdersModule } from 'src/orders/orders.module';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Notifications", schema: NotificationsSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => DriversModule),
    forwardRef(() => AdminsModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => MealsModule),
    forwardRef(() => RestaurantsModule),
    AwsModule,
    FirebaseModule
  ],
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
