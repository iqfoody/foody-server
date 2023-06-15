import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        if(request.headers.authorization){
            request.body = {...request.body, username: "Foody", password: "123123"};
            return request;
        } else throw new UnauthorizedException('Access Denied');
    }
}