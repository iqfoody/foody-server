import { Injectable } from '@nestjs/common';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { InjectModel } from '@nestjs/mongoose';
import { SettingsDocument } from 'src/models/settings.schema';
import { Model } from 'mongoose';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel("Settings") private SettingsModel: Model<SettingsDocument>,
  ){}

  create(createSettingInput: CreateSettingInput) {
    return this.SettingsModel.create(createSettingInput);
  }

  getSupport() {
    return this.SettingsModel.findOne({support: {$exists: true}}, {support: 1, _id: 0});
  }

  findSupport() {
    return this.SettingsModel.findOne({support: {$exists: true}});
  }

  findAll() {
    return this.SettingsModel.find();
  }

  findOne(id: string) {
    return this.SettingsModel.findById(id);
  }

  async update(id: string, updateSettingInput: UpdateSettingInput) {
    await this.SettingsModel.findByIdAndUpdate(id, updateSettingInput);
    return "Success";
  }

  async remove(id: string) {
    await this.SettingsModel.findByIdAndDelete(id);
    return "Success";
  }
}
