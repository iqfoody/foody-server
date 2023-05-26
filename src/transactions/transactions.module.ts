import { Module, forwardRef } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsController } from './transactions.controller';
import { WalletsModule } from 'src/wallets/wallets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsSchema } from 'src/models/transactions.schema';
import { AdminsModule } from 'src/admins/admins.module';
import { OrdersModule } from 'src/orders/orders.module';
import { UsersModule } from 'src/users/users.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Transactions", schema: TransactionsSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => AdminsModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => WalletsModule),
    AwsModule
  ],
  providers: [TransactionsResolver, TransactionsService],
  exports: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
