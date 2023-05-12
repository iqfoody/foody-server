import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PromoCodesService } from './promo-codes.service';
import { PromoCode } from './entities/promo-code.entity';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(AccessAuthGuard)
@Resolver(() => PromoCode)
export class PromoCodesResolver {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @Mutation(() => PromoCode)
  @CheckAbilities({actions: Actions.Create, subject: PromoCode})
  createPromoCode(@Args('createPromoCodeInput') createPromoCodeInput: CreatePromoCodeInput) {
    return this.promoCodesService.create(createPromoCodeInput);
  }

  @Query(() => [PromoCode], { name: 'promoCodes' })
  @CheckAbilities({actions: Actions.Read, subject: PromoCode})
  findAll() {
    return this.promoCodesService.findAll();
  }

  @Query(() => PromoCode, { name: 'promoCode' })
  @CheckAbilities({actions: Actions.Read, subject: PromoCode})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.promoCodesService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: PromoCode})
  updatePromoCode(@Args('updatePromoCodeInput') updatePromoCodeInput: UpdatePromoCodeInput) {
    return this.promoCodesService.update(updatePromoCodeInput.id, updatePromoCodeInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: PromoCode})
  removePromoCode(@Args('id', { type: () => ID }) id: string) {
    return this.promoCodesService.remove(id);
  }
}
