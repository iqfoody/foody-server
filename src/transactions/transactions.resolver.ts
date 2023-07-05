import { Resolver, Query, Mutation, Args, Context, ID } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Actions } from 'src/ability/ability.factory';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { LimitEntity } from 'src/constants/limitEntity';
import { TransactionResponse } from './entities/transactionsResponse.entity';
import { ResetAdminWallet } from 'src/admins/dto/reset-admin-wallet.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    ) {}

  @Mutation(() => Transaction)
  @CheckAbilities({actions: Actions.Create, subject: "Transaction"})
  createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput, @Context() context) {
    return this.transactionsService.create({...createTransactionInput, admin: context.req.user._id}, context.req.user.type === "Admin" ? true : false);
  }

  @Query(() => TransactionResponse, { name: 'transactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findAll(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findAll(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'amountTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findAmount(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findAmount(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'pointsTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findPoints(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.transactionsService.findPoints(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'amountUserTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findAmountUser(@Args('limitEntity') limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.findAmountUser(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'amountDriverTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findAmountDriver(@Args('limitEntity') limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.findAmountDriver(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'adminTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findAllAdmin(@Args('limitEntity') limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.findAllAdmin(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'amountAdminTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findAmountAdmin(@Args('limitEntity') limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.findAmountAdmin(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'pointsAdminTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findPointsAdmin(@Args('limitEntity') limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.findPointsAdmin(limitEntity);
  }

  @Query(() => TransactionResponse, { name: 'pointsUserTransactions' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findPointsUser(@Args('limitEntity') limitEntity: LimitEntity) {
    if(!isValidObjectId(limitEntity?.user)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.findPointsUser(limitEntity);
  }

  @Query(() => Transaction, { name: 'transaction' })
  @CheckAbilities({actions: Actions.Read, subject: "Transaction"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  @CheckAbilities({actions: Actions.Update, subject: "Transaction"})
  updateTransaction(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
    if(!isValidObjectId(updateTransactionInput?.id)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.update(updateTransactionInput.id, updateTransactionInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Manage, subject: "Transaction"})
  resetAdminWallet(@Args('resetAdminWallet') resetAdminWallet: ResetAdminWallet, @Context() context) {
    return this.transactionsService.resetAdmin(context.req.user._id, resetAdminWallet);
  }

  @Mutation(() => Transaction)
  @CheckAbilities({actions: Actions.Delete, subject: "Transaction"})
  removeTransaction(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't transaction with this id");
    return this.transactionsService.remove(id);
  }
}
