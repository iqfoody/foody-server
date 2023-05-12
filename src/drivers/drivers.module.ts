import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversResolver } from './drivers.resolver';
import { DriversController } from './drivers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversSchema } from 'src/models/drivers.schema';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Drivers",  schema: DriversSchema},]),
    AwsModule,
  ],
  providers: [DriversResolver, DriversService],
  exports: [DriversService],
  controllers: [DriversController]
})
export class DriversModule {}
