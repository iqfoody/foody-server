import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { Address } from './entities/address.entity';
import { Actions } from 'src/ability/ability.factory';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@UseGuards(AccessAuthGuard)
@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService,
    ) {}

    @Get('/')
    @CheckAbilities({actions: Actions.Info, subject: Address})
    async getAddresses(@Req() req){
        return this.addressesService.findAddresses(req.user._id);
    }

    @Get('/:id')
    @CheckAbilities({actions: Actions.Info, subject: Address})
    async getAddress(@Param('id') id: string, @Req() req){
        return this.addressesService.findAddress(id, req.user._id);
    }

    @Post('/')
    @CheckAbilities({actions: Actions.Add, subject: Address})
    async createAddress(@Body('createAddressInput') createAddressInput: CreateAddressInput, @Req() req){
        return this.addressesService.create({...createAddressInput, user: req.user._id});
    }

    @Put('/:id')
    @CheckAbilities({actions: Actions.Edit, subject: Address})
    async updateAddress(@Param('id') id: string, @Body('updateAddressInput') updateAddressInput: UpdateAddressInput, @Req() req){
        return this.addressesService.updateAddress(id, updateAddressInput, req.user._id);
    }

    @Delete('/')
    @CheckAbilities({actions: Actions.Remove, subject: Address})
    async deleteAddress(@Param('id') id: string, @Req() req){
        return this.addressesService.removeAddress(id, req.user._id);
    }
}
