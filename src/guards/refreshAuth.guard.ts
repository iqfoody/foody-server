import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        // check if request from website cookies contain access token...
        if(request.cookies.iop){
            const refresh = request.cookies?.iop
            request.body = {...request.body, refresh}
        }
        // check if request header from application contain access token...
        // else if(request.headers.authorization) {
        //     const refresh = request.headers.authorization.replace('Bearer', '').trim();
        //     request.body = {...request.body, refresh}
        // }
        return request;
    }
}