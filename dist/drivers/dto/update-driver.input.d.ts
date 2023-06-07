import { CreateDriverInput } from './create-driver.input';
declare const UpdateDriverInput_base: import("@nestjs/common").Type<Partial<CreateDriverInput>>;
export declare class UpdateDriverInput extends UpdateDriverInput_base {
    id?: string;
    ip?: string;
    platform?: string;
    refreshToken?: string;
    deviceToken?: string;
}
export {};
