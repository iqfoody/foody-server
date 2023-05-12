import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AdvertisementsService } from './advertisements.service';
import { Advertisement } from './entities/advertisement.entity';
import { UpdateAdvertisementInput } from './dto/update-advertisement.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Advertisement)
export class AdvertisementsResolver {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Query(() => [Advertisement], { name: 'advertisements' })
  @CheckAbilities({actions: Actions.Read, subject: Advertisement})
  findAll() {
    return this.advertisementsService.findAll();
  }

  @Query(() => Advertisement, { name: 'advertisement' })
  @CheckAbilities({actions: Actions.Read, subject: Advertisement})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.advertisementsService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Advertisement})
  updateAdvertisement(@Args('updateAdvertisementInput') updateAdvertisementInput: UpdateAdvertisementInput) {
    return this.advertisementsService.update(updateAdvertisementInput.id, updateAdvertisementInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: Advertisement})
  removeAdvertisement(@Args('id', { type: () => ID }) id: string) {
    return this.advertisementsService.remove(id);
  }
}
