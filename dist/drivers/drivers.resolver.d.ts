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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { DriversService } from './drivers.service';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { StateInput } from 'src/constants/state.input';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';
export declare class DriversResolver {
    private readonly driversService;
    constructor(driversService: DriversService);
    createDriver(createDriverInput: CreateDriverInput): Promise<import("mongoose").Document<unknown, import("../models/drivers.schema").IDriversQueryHelpers, import("../models/drivers.schema").DriversDocument> & Omit<import("../models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Promise<Omit<import("mongoose").Document<unknown, import("../models/drivers.schema").IDriversQueryHelpers, import("../models/drivers.schema").DriversDocument> & Omit<import("../models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, import("../models/drivers.schema").IDriversQueryHelpers, import("../models/drivers.schema").DriversDocument> & Omit<import("../models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateDriver(updateDriverInput: UpdateDriverInput): Promise<string>;
    passwordUser(passwordDriverInput: UpdatePasswordUser): Promise<string>;
    stateDriver(stateInput: StateInput): Promise<string>;
    removeDriver(id: string): Promise<string>;
}
