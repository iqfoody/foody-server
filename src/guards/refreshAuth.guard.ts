import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        if(request.cookies.iop){
            const refresh = request.cookies?.iop
            request.body = {...request.body, refresh}
            return request;
        }
        else if(request.headers.authorization) {
            const refresh = request.headers.authorization.replace('Bearer', '').trim();
            request.body = {...request.body, refresh}
        }
        else throw new UnauthorizedException("Access denied");
    }
}