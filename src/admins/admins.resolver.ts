import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { StateInput } from 'src/constants/state.input';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Admin)
export class AdminsResolver {
  constructor(private readonly adminsService: AdminsService) {}

  @Mutation(() => Admin)
  @CheckAbilities({actions: Actions.Create, subject: "Admin"})
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput, @Context() context) {
    return this.adminsService.create(context.req.user._id, createAdminInput);
  }

  @Query(() => [Admin], { name: 'admins' })
  @CheckAbilities({actions: Actions.Read, subject: "Admin"})
  findAll() {
    return this.adminsService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  @CheckAbilities({actions: Actions.Read, subject: "Admin"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't admin with this id");
    return this.adminsService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Admin"})
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    if(!isValidObjectId(updateAdminInput?.id)) throw new BadRequestException("There isn't admin with this id");
    return this.adminsService.update(updateAdminInput.id, updateAdminInput);
  }

  @Mutation(() => String, {name: 'passwordAdmin'})
  @CheckAbilities({actions: Actions.Update, subject: "Admin"})
  async passwordUser(@Args('passwordAdminInput') passwordAdminInput: UpdatePasswordUser) {
    if(!isValidObjectId(passwordAdminInput?.id)) throw new BadRequestException("There isn't admin with this id");
    return this.adminsService.passwordAdmin(passwordAdminInput.id, passwordAdminInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: "Admin"})
  async stateAdmin(@Args('stateInput') stateInput: StateInput) {
    if(!isValidObjectId(stateInput?.id)) throw new BadRequestException("There isn't admin with this id");
    return this.adminsService.state(stateInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Admin"})
  removeAdmin(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't admin with this id");
    return this.adminsService.remove(id);
  }
}
