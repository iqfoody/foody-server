import { advertisementsTypes } from 'src/constants/types.type';
import { CreateFavoriteInput } from './create-favorite.input';
declare const UpdateFavoriteInput_base: import("@nestjs/common").Type<Partial<CreateFavoriteInput>>;
export declare class UpdateFavoriteInput extends UpdateFavoriteInput_base {
    type: advertisementsTypes;
    restaurant?: string;
    meal?: string;
}
export {};
