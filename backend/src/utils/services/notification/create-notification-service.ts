import { AppDataSource } from "../../../database/configuration/data-source";

export const createNotification = async (
  user_id: string,
  description: string,
  title:string
) => {
  try {
    const notificationRepository = AppDataSource.getRepository("Notification");
    const notification = notificationRepository.create({
      description: description,
      user: user_id,
      title:title
    });
    await notificationRepository.save(notification);
    return notification;
  } catch (err: any) {

    console.log(err)
    return new Error(err.toString());
  }
};
