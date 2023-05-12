import { GqlArgumentsHost, GqlExceptionFilter, GqlExecutionContext } from "@nestjs/graphql";
import { InternalServerErrorException, Logger, Catch, BadRequestException } from '@nestjs/common'


@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: GqlExecutionContext, host: GqlArgumentsHost) {
        this.logger.log(HttpExceptionFilter.name);
        const { code, keyValue, message } = exception as any;

        console.log(exception)
        if(code){
            console.log(Object.keys(keyValue))
            //throw new InternalServerErrorException({[Object.keys(keyValue)[0]]: code})
            if(Object.keys(keyValue)[0] === 'username'){
                throw new InternalServerErrorException(`${Object.keys(keyValue)[0]} E0007`)
            }
            throw new InternalServerErrorException(`${Object.keys(keyValue)[0]} ${code}`)
        }

        throw new InternalServerErrorException(message)
    }
}