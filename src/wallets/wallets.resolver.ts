import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { WalletsService } from './wallets.service';
import { Wallet } from './entities/wallet.entity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Wallet)
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Query(() => Wallet, { name: 'wallet' })
  @CheckAbilities({actions: Actions.Read, subject: "Wallet"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't wallet with this id");
    return this.walletsService.findOne(id);
  }

}
