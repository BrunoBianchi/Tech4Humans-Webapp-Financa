import { BaseService } from "../../class/base-service-class";
import { NotificationType } from "../../types/notification-type";

class NotificationService extends BaseService<NotificationType> {
    
}

export const notificationService = new NotificationService();