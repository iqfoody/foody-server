import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AdvertisementsService } from './advertisements.service';
import { Advertisement } from './entities/advertisement.entity';
import { UpdateAdvertisementInput } from './dto/update-advertisement.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { UpdatePositionInput } from 'src/constants/position.input';
import { StateInput } from 'src/constants/state.input';
import { CreateAdvertisementInput } from './dto/create-advertisement.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Advertisement)
export class AdvertisementsResolver {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Mutation(()=> Advertisement)
  @CheckAbilities({actions: Actions.Read, subject: "Advertisement"})
  createAdvertisement(@Args('createAdvertisementInput') createAdvertisementInput: CreateAdvertisementInput){
    return this.advertisementsService.create(createAdvertisementInput);
  }

  @Query(() => [Advertisement], { name: 'advertisements' })
  @CheckAbilities({actions: Actions.Read, subject: "Advertisement"})
  findAll() {
    return this.advertisementsService.findAll();
  }

  @Query(() => Advertisement, { name: 'advertisement' })
  @CheckAbilities({actions: Actions.Read, subject: "Advertisement"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't advertisement with this id");
    return this.advertisementsService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Advertisement"})
  updateAdvertisement(@Args('updateAdvertisementInput') updateAdvertisementInput: UpdateAdvertisementInput) {
    if(!isValidObjectId(updateAdvertisementInput?.id)) throw new BadRequestException("There isn't advertisement with this id");
    return this.advertisementsService.update(updateAdvertisementInput.id, updateAdvertisementInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Advertisement"})
  positionAdvertisement(@Args('updatePositionInput', {type: ()=> [UpdatePositionInput]}) updatePositionInput: UpdatePositionInput[]) {
    return this.advertisementsService.position(updatePositionInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Advertisement"})
  stateAdvertisement(@Args('stateInput') stateInput: StateInput) {
    if(!isValidObjectId(stateInput?.id)) throw new BadRequestException("There isn't advertisement with this id");
    return this.advertisementsService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Advertisement"})
  removeAdvertisement(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't advertisement with this id");
    return this.advertisementsService.remove(id);
  }
}
