import { User } from 'src/users/entities/user.entity';
export declare class Feedback {
    _id: string;
    subject: string;
    message: string;
    name?: string;
    phoneNumber?: string;
    user?: string | User;
}
