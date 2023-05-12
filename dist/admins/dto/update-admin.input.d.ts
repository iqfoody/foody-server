import { CreateAdminInput } from './create-admin.input';
declare const UpdateAdminInput_base: import("@nestjs/common").Type<Partial<CreateAdminInput>>;
export declare class UpdateAdminInput extends UpdateAdminInput_base {
    id?: string;
    ip?: string;
    platform?: string;
    refreshToken?: string;
    deviceToken?: string;
}
export {};
