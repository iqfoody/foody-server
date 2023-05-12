import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { UseGuards } from '@nestjs/common';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { StateInput } from 'src/constants/state.input';
import { Response } from 'src/constants/response.entity';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => Driver)
  @CheckAbilities({actions: Actions.Create, subject: Driver})
  createDriver(@Args('createDriverInput') createDriverInput: CreateDriverInput) {
    return this.driversService.create(createDriverInput, null);
  }

  @Query(() => [Driver], { name: 'drivers' })
  @CheckAbilities({actions: Actions.Read, subject: Driver})
  findAll() {
    return this.driversService.findAll();
  }

  @Query(() => Driver, { name: 'driver' })
  @CheckAbilities({actions: Actions.Read, subject: Driver})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.driversService.findOne(id);
  }

  @Mutation(() => Response)
  @CheckAbilities({actions: Actions.Update, subject: Driver})
  updateDriver(@Args('updateDriverInput') updateDriverInput: UpdateDriverInput) {
    return this.driversService.update(updateDriverInput.id, updateDriverInput);
  }

  @Mutation(() => Response)
  @CheckAbilities({actions: Actions.State, subject: Driver})
  stateDriver(@Args('stateInput') stateInput: StateInput) {
    return this.driversService.state(stateInput);
  }

  @Mutation(() => Response)
  @CheckAbilities({actions: Actions.Delete, subject: Driver})
  removeDriver(@Args('id', { type: () => ID }) id: string) {
    return this.driversService.remove(id);
  }
}
