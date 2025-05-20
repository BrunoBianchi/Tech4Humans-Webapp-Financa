import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
import { User } from "../../utils/types/user-type";
import { createUser } from "../../utils/services/user/create-user-service";
import auth from "../../middlewares/permission-middleware";
import { Request } from "express";
@Router()
export class UserRoute {
  @Post({
    path: "/",

    params: [
      {
        name: "name",
        type: "string",
 
      },
      {
        name: "email",
        type: "string",
      },
      {
        name: "password",
        type: "string",
      },
    ],
  })
  public async createUserDB(user: User) {
    const {password, ...userWithoutPassword } = user;
    return {
      authorization: await createUser(user),
      expiration: "1h",
      user: userWithoutPassword,
    };
  }

  @Get({
    path: "/@",
    permissions: [auth],
  })
  public getMeUser(_:any,req:Request) {
    return req.user;
  }
}
