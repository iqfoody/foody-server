import { Reflector } from "@nestjs/core";
import { Strategy } from 'passport-jwt';
import { AbilityFactory } from "src/ability/ability.factory";
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    private reflector;
    private caslAbilityFactory;
    constructor(reflector: Reflector, caslAbilityFactory: AbilityFactory);
    validate(req: any, payload: any): Promise<any>;
}
export {};
