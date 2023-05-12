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
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { IDriversModel } from 'src/models/drivers.schema';
import { AwsService } from 'src/aws/aws.service';
import { LoginInput } from 'src/auth/dto/login.input';
import { StateInput } from 'src/constants/state.input';
import { Response } from 'src/constants/response.entity';
export declare class DriversService {
    private DriversModel;
    private readonly awsService;
    constructor(DriversModel: IDriversModel, awsService: AwsService);
    login(loginInput: LoginInput): Promise<import("src/models/drivers.schema").DriversDocument>;
    create(createDriverInput: CreateDriverInput, file: any): Promise<import("mongoose").Document<unknown, import("src/models/drivers.schema").IDriversQueryHelpers, import("src/models/drivers.schema").DriversDocument> & Omit<import("src/models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Promise<(import("mongoose").Document<unknown, import("src/models/drivers.schema").IDriversQueryHelpers, import("src/models/drivers.schema").DriversDocument> & Omit<import("src/models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, import("src/models/drivers.schema").IDriversQueryHelpers, import("src/models/drivers.schema").DriversDocument> & Omit<import("src/models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    info(id: string): Promise<import("mongoose").Document<unknown, import("src/models/drivers.schema").IDriversQueryHelpers, import("src/models/drivers.schema").DriversDocument> & Omit<import("src/models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByPhoneNumber(phoneNumber: string): Promise<import("mongoose").Document<unknown, import("src/models/drivers.schema").IDriversQueryHelpers, import("src/models/drivers.schema").DriversDocument> & Omit<import("src/models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAny(id: string, updateAdminInput: UpdateDriverInput): Promise<void>;
    update(id: string, updateDriverInput: UpdateDriverInput): Promise<{
        message: string;
    }>;
    state(stateInput: StateInput): Promise<Response>;
    logout(id: string): Promise<void>;
    refresh(id: string, token: string): Promise<import("mongoose").Document<unknown, import("src/models/drivers.schema").IDriversQueryHelpers, import("src/models/drivers.schema").DriversDocument> & Omit<import("src/models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    remove(_id: string): Promise<{
        message: string;
    }>;
}
