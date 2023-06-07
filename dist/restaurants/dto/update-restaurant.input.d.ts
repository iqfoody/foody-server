import { CreateRestaurantInput } from './create-restaurant.input';
declare const UpdateRestaurantInput_base: import("@nestjs/common").Type<Partial<CreateRestaurantInput>>;
export declare class UpdateRestaurantInput extends UpdateRestaurantInput_base {
    id?: string;
    rating?: number;
    rates?: number;
}
export {};
