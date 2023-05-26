import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { Actions } from 'src/ability/ability.factory';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { LimitEntity } from 'src/constants/limitEntity';
import { TransactionResponse } from './entities/transactionsResponse.entity';

@UseGuards(AccessAuthGuard)
@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => Transaction)
  @CheckAbilities({actions: Actions.Create, subject: Transaction})
  createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput) {
    return this.transactionsService.create(createTransactionInput);
  }

  @Query(() => TransactionResponse, { name: 'transactions' })
  @CheckAbilities({actions: Actions.Read, subject: Transaction})
  findAll(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findAll(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'amountTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: Transaction})
  findAmount(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findAmount(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'pointsTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: Transaction})
  findPoints(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findPoints(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'userTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: Transaction})
  findForUser(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findForUser(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'adminTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: Transaction})
  findForAdmin(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findForAdmin(limitEntity);
  }

  @Query(() => Transaction, { name: 'transaction' })
  @CheckAbilities({actions: Actions.Read, subject: Transaction})
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  @CheckAbilities({actions: Actions.Update, subject: Transaction})
  updateTransaction(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
    return this.transactionsService.update(updateTransactionInput.id, updateTransactionInput);
  }

  @Mutation(() => Transaction)
  @CheckAbilities({actions: Actions.Delete, subject: Transaction})
  removeTransaction(@Args('id', { type: () => String }) id: string) {
    return this.transactionsService.remove(id);
  }
}
