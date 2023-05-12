import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const body = request.body;
        const origin = request.headers.origin;
        //TODO: accept just my origins website or applications urls...
        request.body = {...body, origin};
        return request;
    }
}