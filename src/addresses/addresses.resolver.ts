import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation(() => Address)
  @CheckAbilities({actions: Actions.Create, subject: Address})
  createAddress(@Args('createAddressInput') createAddressInput: CreateAddressInput) {
    return this.addressesService.create(createAddressInput);
  }

  @Query(() => [Address], { name: 'addresses' })
  @CheckAbilities({actions: Actions.Read, subject: Address})
  findAll(@Args('id', {type: () => ID}) id: string) {
    return this.addressesService.findAll(id);
  }

  @Query(() => Address, { name: 'address' })
  @CheckAbilities({actions: Actions.Read, subject: Address})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.addressesService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Address})
  updateAddress(@Args('updateAddressInput') updateAddressInput: UpdateAddressInput) {
    return this.addressesService.update(updateAddressInput.id, updateAddressInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: Address})
  removeAddress(@Args('id', { type: () => ID }) id: string) {
    return this.addressesService.remove(id);
  }
}
