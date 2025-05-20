import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
import { User } from "../../utils/types/user-type";
import { createUser } from "../../utils/services/user/create-user-service";

@Router()
export class UserRoute {
  @Post({
    path: "/",
    params: [
      {
        name: "name",
        type: "string",
        required: true,
      },
      {
        name: "email",
        type: "string",
        required: true,
      },
      {
        name: "password",
        type: "string",
        required: true,
      },
    ],
  })
  public async createUserDB(user: User) {
   return {
    authorization: await createUser(user),
    expiration: "1h",
    user:{
      name: user.name,
      email: user.email,
    }
   }

  }

  @Get({
    path: "/user2",
  })
  public get2Index() {
    return "a23";
  }
}
