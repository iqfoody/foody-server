import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { WalletsService } from './wallets.service';
import { Wallet } from './entities/wallet.entity';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Wallet)
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Query(() => Wallet, { name: 'wallet' })
  @CheckAbilities({actions: Actions.Read, subject: Wallet})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.walletsService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Wallet})
  updateWallet(@Args('updateWalletInput') updateWalletInput: UpdateWalletInput) {
    return this.walletsService.update(updateWalletInput.id, updateWalletInput);
  }

}
