import { Actions, Subjects } from "./ability.factory";
export interface RequiredRule {
    actions: Actions;
    subject: Subjects;
    field?: string;
}
export declare const CHECK_ABILITY = "check_ability";
export declare const PUBLIC_INTERCEPTOR = "isPublic";
export declare const CheckAbilities: (...requirements: RequiredRule[]) => import("@nestjs/common").CustomDecorator<string>;
