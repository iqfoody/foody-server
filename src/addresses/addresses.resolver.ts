import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation(() => Address)
  @CheckAbilities({actions: Actions.Create, subject: "User"})
  createAddress(@Args('createAddressInput') createAddressInput: CreateAddressInput) {
    return this.addressesService.create(createAddressInput);
  }

  @Query(() => [Address], { name: 'addresses' })
  @CheckAbilities({actions: Actions.Read, subject: "User"})
  findAll(@Args('id', {type: () => ID}) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't address with this id");
    return this.addressesService.findAll(id);
  }

  @Query(() => Address, { name: 'address' })
  @CheckAbilities({actions: Actions.Read, subject: "User"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't address with this id");
    return this.addressesService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "User"})
  updateAddress(@Args('updateAddressInput') updateAddressInput: UpdateAddressInput) {
    if(!isValidObjectId(updateAddressInput?.id)) throw new BadRequestException("There isn't address with this id");
    return this.addressesService.update(updateAddressInput.id, updateAddressInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "User"})
  removeAddress(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't address with this id");
    return this.addressesService.remove(id);
  }
}
