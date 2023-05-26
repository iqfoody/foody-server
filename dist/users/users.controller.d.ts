import { UsersService } from './users.service';
import { AwsService } from 'src/aws/aws.service';
import { PasswordUserInput } from './dto/password-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserInfo } from './dto/update-info.input';
import { CreateUserInput } from './dto/create-user.input';
export declare class UsersController {
    private readonly usersService;
    private readonly awsService;
    constructor(usersService: UsersService, awsService: AwsService);
    update(updateUserInfo: UpdateUserInfo, file: any, req: any): Promise<string>;
    password(passwordUserInput: PasswordUserInput, req: any): Promise<string>;
    createUser(createUserInput: CreateUserInput, file: any): Promise<{
        _id: any;
        name: any;
        phoneNumber: any;
        image: any;
        type: any;
        state: any;
        createdAt: any;
        email: any;
    }>;
    updateUser(updateUserInput: UpdateUserInput, file: any): Promise<string>;
}
