import { SetMetadata } from "@nestjs/common";
import { Actions, Subjects } from "./ability.factory";

export interface RequiredRule {
    actions: Actions,
    subject: Subjects,
    field?: string,
}

export const CHECK_ABILITY = 'check_ability';
export const PUBLIC_INTERCEPTOR = 'isPublic';

// decorator check ability factory rules...
export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements);