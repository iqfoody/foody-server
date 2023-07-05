import { AdminPermission } from 'src/admins/entities/admin-permissions.entity';
export declare class ContextUser {
    _id: string;
    name: string;
    phoneNumber?: string;
    email?: string;
    type: string;
    metadata: string;
    refreshToken?: string;
    deviceToken?: string;
    permissions: AdminPermission[];
}
