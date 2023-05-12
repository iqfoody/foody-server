import { GqlArgumentsHost, GqlExceptionFilter, GqlExecutionContext } from "@nestjs/graphql";
export declare class HttpExceptionFilter implements GqlExceptionFilter {
    private readonly logger;
    catch(exception: GqlExecutionContext, host: GqlArgumentsHost): void;
}
