import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";

export const createNotification = async (
  user_id: string,
  description: string,
  title: string
) => {
  const notificationRepository = AppDataSource.getRepository("Notification");
  const notification = notificationRepository.create({
    description: description,
    user: user_id,
    title: title,
  });
  await notificationRepository.save(notification);
  return notification;
};
