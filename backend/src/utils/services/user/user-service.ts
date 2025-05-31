import { BaseService } from "../../class/base-service-class";
import { User } from "../../types/user-type";

class UserService extends BaseService<User> {}

export const userService = new UserService();
