import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { StateInput } from 'src/constants/state.input';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { PasswordUserInput } from 'src/users/dto/password-user.input';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';

@UseGuards(AccessAuthGuard)
@Resolver(() => Admin)
export class AdminsResolver {
  constructor(private readonly adminsService: AdminsService) {}

  @Mutation(() => Admin)
  @CheckAbilities({actions: Actions.Create, subject: Admin})
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput, @Context() context) {
    return this.adminsService.create(context.req.user._id, createAdminInput, null);
  }

  @Query(() => [Admin], { name: 'admins' })
  @CheckAbilities({actions: Actions.Read, subject: Admin})
  findAll() {
    return this.adminsService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  @CheckAbilities({actions: Actions.Read, subject: Admin})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.adminsService.findOne(id);
  }

  @Query(() => Admin, { name: 'infoAdmin' })
  @CheckAbilities({actions: Actions.Info, subject: Admin})
  infoAdmin(@Context() context) {
    return this.adminsService.findInfo(context.req.user._id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Admin})
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminsService.update(updateAdminInput.id, updateAdminInput);
  }

  @Mutation(() => String, {name: 'passwordAdmin'})
  @CheckAbilities({actions: Actions.Update, subject: Admin})
  async passwordUser(@Args('passwordAdminInput') passwordAdminInput: UpdatePasswordUser) {
    return this.adminsService.passwordAdmin(passwordAdminInput.id, passwordAdminInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.State, subject: Admin})
  async stateAdmin(@Args('stateInput') stateInput: StateInput) {
    return this.adminsService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: Admin})
  removeAdmin(@Args('id', { type: () => ID }) id: string) {
    return this.adminsService.remove(id);
  }
}
