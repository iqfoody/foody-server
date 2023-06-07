import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Setting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Mutation(() => Setting)
  @CheckAbilities({actions: Actions.Create, subject: Setting})
  createSetting(@Args('createSettingInput') createSettingInput: CreateSettingInput) {
    return this.settingsService.create(createSettingInput);
  }

  @Query(() => [Setting], { name: 'settings' })
  @CheckAbilities({actions: Actions.Read, subject: Setting})
  findAll() {
    return this.settingsService.findAll();
  }

  @Query(() => Setting, { name: 'support' })
  @CheckAbilities({actions: Actions.Read, subject: Setting})
  findSupport() {
    return this.settingsService.findSupport();
  }

  @Query(() => Setting, { name: 'setting' })
  @CheckAbilities({actions: Actions.Read, subject: Setting})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.settingsService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Update, subject: Setting})
  updateSetting(@Args('updateSettingInput') updateSettingInput: UpdateSettingInput) {
    return this.settingsService.update(updateSettingInput.id, updateSettingInput);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: Setting})
  removeSetting(@Args('id', { type: () => ID }) id: string) {
    return this.settingsService.remove(id);
  }
}
