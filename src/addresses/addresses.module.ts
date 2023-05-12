import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesResolver } from './addresses.resolver';
import { AddressesController } from './addresses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressesSchema } from 'src/models/addresses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Addresses", schema: AddressesSchema }]),
  ],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
  controllers: [AddressesController]
})
export class AddressesModule {}
