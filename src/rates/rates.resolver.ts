import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RatesService } from './rates.service';
import { Rate } from './entities/rate.entity';
import { CreateRateInput } from './dto/create-rate.input';
import { UpdateRateInput } from './dto/update-rate.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Rate)
export class RatesResolver {
  constructor(private readonly ratesService: RatesService) {}

  @Mutation(() => Rate)
  @CheckAbilities({actions: Actions.Create, subject: Rate})
  createRate(@Args('createRateInput') createRateInput: CreateRateInput) {
    return this.ratesService.create(createRateInput);
  }

  @Query(() => [Rate], { name: 'rates' })
  @CheckAbilities({actions: Actions.Read, subject: Rate})
  findAll() {
    return this.ratesService.findAll();
  }

  @Query(() => Rate, { name: 'rate' })
  @CheckAbilities({actions: Actions.Read, subject: Rate})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.ratesService.findOne(id);
  }

  @Mutation(() => Rate)
  @CheckAbilities({actions: Actions.Update, subject: Rate})
  updateRate(@Args('updateRateInput') updateRateInput: UpdateRateInput) {
    return this.ratesService.update(updateRateInput.id, updateRateInput);
  }

  @Mutation(() => Rate)
  @CheckAbilities({actions: Actions.Delete, subject: Rate})
  removeRate(@Args('id', { type: () => ID }) id: string) {
    return this.ratesService.remove(id);
  }
}
