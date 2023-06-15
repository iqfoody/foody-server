import { notificationsTypes } from 'src/constants/types.type';
export declare class CreateNotificationInput {
    user?: string;
    driver?: string;
    order?: string;
    restaurant?: string;
    meal?: string;
    type: notificationsTypes;
    title: string;
    titleEN: string;
    titleKR?: string;
    body: string;
    bodyEN: string;
    bodyKR?: string;
    submit?: string;
    dismiss?: string;
    action?: string;
    priority?: string;
}
