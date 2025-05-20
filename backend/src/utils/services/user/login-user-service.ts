import { User } from "../../types/user-type";
import { getUser } from "./get-user-service";
import * as bcrypt from "bcrypt";
export const loginUser = async (email: string, password: string) => {
  try {
    const user: User = (await getUser(email)) as User;
    if (!user) throw new Error("Invalid password or email");
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) throw new Error("Invalid password or email");
    return user;
  } catch  {
    throw new Error("Invalid password or email");
  }
};
