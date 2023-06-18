import { Module, forwardRef } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesResolver } from './addresses.resolver';
import { AddressesController } from './addresses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressesSchema } from 'src/models/addresses.schema';
import { UsersModule } from 'src/users/users.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Addresses", schema: AddressesSchema }]),
    forwardRef(()=> UsersModule),
    FirebaseModule
  ],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
  controllers: [AddressesController]
})
export class AddressesModule {}
