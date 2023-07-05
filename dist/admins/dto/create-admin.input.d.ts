import Upload from 'src/constants/Upload';
import { AdminPermissionsInput } from './create-admin-permissions.input';
export declare class CreateAdminInput {
    name: string;
    email: string;
    password: string;
    permissions: AdminPermissionsInput[];
    image?: Upload;
}
