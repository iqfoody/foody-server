import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
export declare class NotificationsService {
    create(createNotificationInput: CreateNotificationInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateNotificationInput: UpdateNotificationInput): string;
    remove(id: number): string;
}
