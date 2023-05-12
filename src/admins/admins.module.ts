import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsSchema } from 'src/models/admins.schema';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Admins",  schema: AdminsSchema},]),
    AwsModule,
  ],
  providers: [AdminsResolver, AdminsService],
  exports: [AdminsService],
  controllers: [AdminsController]
})
export class AdminsModule {}
