/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { SettingsDocument } from 'src/models/settings.schema';
import { Model } from 'mongoose';
export declare class SettingsService {
    private SettingsModel;
    constructor(SettingsModel: Model<SettingsDocument>);
    create(createSettingInput: CreateSettingInput): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getSupport(): import("mongoose").Query<import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, SettingsDocument>;
    findSupport(): import("mongoose").Query<import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, SettingsDocument>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, SettingsDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, SettingsDocument> & Omit<import("src/models/settings.schema").Settings & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, SettingsDocument>;
    update(id: string, updateSettingInput: UpdateSettingInput): Promise<string>;
    remove(id: string): Promise<string>;
}
