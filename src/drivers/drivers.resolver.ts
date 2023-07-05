import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { StateInput } from 'src/constants/state.input';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => Driver)
  @CheckAbilities({actions: Actions.Create, subject: "Driver"})
  createDriver(@Args('createDriverInput') createDriverInput: CreateDriverInput) {
    return this.driversService.create(createDriverInput);
  }

  @Query(() => [Driver], { name: 'drivers' })
  @CheckAbilities({actions: Actions.Read, subject: "Driver"})
  findAll() {
    return this.driversService.findAll();
  }

  @Query(() => Driver, { name: 'driver' })
  @CheckAbilities({actions: Actions.Read, subject: "Driver"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't driver with this id");
    return this.driversService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Driver"})
  updateDriver(@Args('updateDriverInput') updateDriverInput: UpdateDriverInput) {
    if(!isValidObjectId(updateDriverInput?.id)) throw new BadRequestException("There isn't driver with this id");
    return this.driversService.update(updateDriverInput.id, updateDriverInput);
  }

  @Mutation(() => String, {name: 'passwordDriver'})
  @CheckAbilities({actions: Actions.Update, subject: "Driver"})
  async passwordUser(@Args('passwordDriverInput') passwordDriverInput: UpdatePasswordUser) {
    if(!isValidObjectId(passwordDriverInput?.id)) throw new BadRequestException("There isn't driver with this id");
    return this.driversService.password(passwordDriverInput.id, passwordDriverInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Driver"})
  stateDriver(@Args('stateInput') stateInput: StateInput) {
    if(!isValidObjectId(stateInput?.id)) throw new BadRequestException("There isn't driver with this id");
    return this.driversService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Driver"})
  removeDriver(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't driver with this id");
    return this.driversService.remove(id);
  }
}
