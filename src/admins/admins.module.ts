import { Module, forwardRef } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsSchema } from 'src/models/admins.schema';
import { AwsModule } from 'src/aws/aws.module';
import { WalletsModule } from 'src/wallets/wallets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Admins",  schema: AdminsSchema},]),
    forwardRef(()=> WalletsModule),
    AwsModule,
  ],
  providers: [AdminsResolver, AdminsService],
  exports: [AdminsService]
})
export class AdminsModule {}
