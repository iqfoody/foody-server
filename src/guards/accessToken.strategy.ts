import { ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AbilityFactory } from "src/ability/ability.factory";
import { CHECK_ABILITY, RequiredRule } from "src/ability/ability.decorator";


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
      private reflector: Reflector,
      private caslAbilityFactory: AbilityFactory,
    ){
        super({
          jwtFromRequest: ExtractJwt.fromBodyField('access'),
          secretOrKey: process.env.PUBLIC_ACCESS_TOKEN,
          passReqToCallback: true,
        });
    }

   async validate(req: any, payload: any){
    // get target class handler...
    const handler = req.body!.handler;
    // get reflectoe by check ability with handler class... 
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, handler) || [];
    // define ability with user data...
    const ability = this.caslAbilityFactory.defineAbility(payload);
    try{
       // check if he can do the rule had injected in resolver...
       const canAccess = rules.every((rule) => ability.relevantRuleFor(rule.actions, rule.subject, rule?.field));
       if(canAccess){
        // return verifyed user data from JWT to Context... 
        return payload;
       }
       throw new ForbiddenException("Access Denied");
    } catch(err) {
       throw new ForbiddenException(err.message);
    }
   }
}