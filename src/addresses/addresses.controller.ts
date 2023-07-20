import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService,
    ) {}

    @Get('/')
    async getAddresses(@Req() req){
        return this.addressesService.findAddresses(req.user);
    }

    @Post('/')
    async createAddress(@Body('createAddressInput') createAddressInput: CreateAddressInput, @Req() req){
        return this.addressesService.create({...createAddressInput, user: req.user});
    }

    @Get('/:id')
    async getAddress(@Param('id') id: string, @Req() req){
        return this.addressesService.findAddress(id, req.user);
    }

    @Put('/:id')
    async updateAddress(@Param('id') id: string, @Body('updateAddressInput') updateAddressInput: UpdateAddressInput, @Req() req){
        return this.addressesService.updateAddress({...updateAddressInput, id}, req.user);
    }

    @Delete('/:id')
    async deleteAddress(@Param('id') id: string, @Req() req){
        return this.addressesService.removeAddress(id, req.user);
    }
}
