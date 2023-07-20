import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AccessAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        // extruct the class handler...
        const handler = ctx.getHandler();
        // check if request from website cookies contain access token...
        if(request.cookies.osk){
            const access = request.cookies.osk
            request.body = {...request.body, access, handler}
        }
        // check if request header from application contain access token...
         else if(request.headers.authorization) {
            const access = request.headers.authorization.replace('Bearer', '').trim();
            request.body = {...request.body, access, handler}
        }
        else throw new UnauthorizedException("Access denied");
        return request;
    }
}