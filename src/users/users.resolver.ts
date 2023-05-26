import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { SearchUsersInput } from './dto/search-users.input';
import { UsersResponse } from './entities/usersResponse.entity';
import { StateInput } from 'src/constants/state.input';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { LimitEntity } from 'src/constants/limitEntity';
import { UpdatePasswordUser } from './dto/update-password-user.input';
import { Months } from 'src/constants/reportsResults.entity';

@UseGuards(AccessAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Mutation(()=> User)
  @CheckAbilities({actions: Actions.Create, subject: User})
  createUser(@Args('createUserInput') createUserInput: CreateUserInput){
    return this.usersService.createUser(createUserInput, null);
  }

  @Query(() => UsersResponse, { name: 'users' })
  @CheckAbilities({actions: Actions.Read, subject: User})
  async findAll(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.usersService.findAllUsers(limitEntity);
  }

  @Query(() => User, { name: 'user' })
  @CheckAbilities({actions: Actions.Read, subject: User})
  async findOne(@Args('id', {type: () => ID}) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: User})
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String, {name: 'passwordUser'})
  @CheckAbilities({actions: Actions.Update, subject: User})
  async passwordUser(@Args('passwordUserInput') passwordUserInput: UpdatePasswordUser) {
    return this.usersService.passwordUser(passwordUserInput.id, passwordUserInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.State, subject: User})
  async stateUser(@Args('stateInput') stateInput: StateInput) {
    return this.usersService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: User})
  async removeUser(@Args('id', {type: ()=> ID}) id: string) {
    return this.usersService.remove(id);
  }

  @Query(() => Months, { name: 'usersReport' })
  @CheckAbilities({actions: Actions.Read, subject: User})
  usersReports(@Args('date', {type: ()=> String}) date: string) {
    return this.usersService.usersReport(date);
  }

}