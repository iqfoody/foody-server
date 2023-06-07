import { CreateWalletInput } from './create-wallet.input';
declare const UpdateWalletInput_base: import("@nestjs/common").Type<Partial<CreateWalletInput>>;
export declare class UpdateWalletInput extends UpdateWalletInput_base {
    id?: string;
    amount?: number;
    points?: number;
}
export {};
