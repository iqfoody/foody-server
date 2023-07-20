import { UsersService } from './users.service';
import { AwsService } from 'src/aws/aws.service';
import { UpdateUserInfo } from './dto/update-info.input';
export declare class UsersController {
    private readonly usersService;
    private readonly awsService;
    constructor(usersService: UsersService, awsService: AwsService);
    update(updateUserInfo: UpdateUserInfo, file: any, req: any): Promise<string>;
    deleteAccount(req: any): Promise<string>;
}
