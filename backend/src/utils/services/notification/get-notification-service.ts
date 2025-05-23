import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";

export const getNotification = async (notification: string) => {
  const notificationRepository = AppDataSource.getRepository("Notification");
  const notificationData = (await notificationRepository.findOne({
    where: {
      notification_id: notification,
    },
  })) as Notification;
  if (!notificationData)
    throw new ApiError(404, "Couldn't find this notification !");
  return notificationData;
};
