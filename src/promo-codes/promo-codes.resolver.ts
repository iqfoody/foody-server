import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PromoCodesService } from './promo-codes.service';
import { PromoCode } from './entities/promo-code.entity';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { StateInput } from 'src/constants/state.input';
import { CheckPromoCodeInput } from './dto/check-promo-code.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => PromoCode)
export class PromoCodesResolver {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @Mutation(() => PromoCode)
  @CheckAbilities({actions: Actions.Create, subject: "PromoCode"})
  createPromoCode(@Args('createPromoCodeInput') createPromoCodeInput: CreatePromoCodeInput) {
    return this.promoCodesService.create(createPromoCodeInput);
  }

  @Mutation(() => PromoCode)
  @CheckAbilities({actions: Actions.Create, subject: "Order"})
  checkPromoCode(@Args('checkPromoCodeInput') checkPromoCodeInput: CheckPromoCodeInput) {
    return this.promoCodesService.checkPromoCode(checkPromoCodeInput);
  }

  @Query(() => [PromoCode], { name: 'promoCodes' })
  @CheckAbilities({actions: Actions.Read, subject: "PromoCode"})
  findAll() {
    return this.promoCodesService.findAll();
  }

  @Query(() => PromoCode, { name: 'promoCode' })
  @CheckAbilities({actions: Actions.Read, subject: "PromoCode"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't promo code with this id");
    return this.promoCodesService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "PromoCode"})
  updatePromoCode(@Args('updatePromoCodeInput') updatePromoCodeInput: UpdatePromoCodeInput) {
    if(!isValidObjectId(updatePromoCodeInput?.id)) throw new BadRequestException("There isn't promo code with this id");
    return this.promoCodesService.update(updatePromoCodeInput.id, updatePromoCodeInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "PromoCode"})
  statePromoCode(@Args('stateInput') stateInput: StateInput) {
    if(!isValidObjectId(stateInput?.id)) throw new BadRequestException("There isn't promo code with this id");
    return this.promoCodesService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "PromoCode"})
  removePromoCode(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't promo code with this id");
    return this.promoCodesService.remove(id);
  }
}
