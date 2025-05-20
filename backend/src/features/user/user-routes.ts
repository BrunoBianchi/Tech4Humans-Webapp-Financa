import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
import { User } from "../../utils/types/user-type";
import { createUser } from "../../utils/services/user/create-user-service";
import auth from "../../middlewares/permission-middleware";
import { loginUser } from "../../utils/services/user/login-user-service";
import { Request } from "express";

@Router()
export class UserRoute {

  @Post({
    path: "/sign-in",

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

  public async signInRoute(user: User) {
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

  public getMeUserRoute(_:any,req:Request) {
    return req.user;
  }

  @Post({
    path: "/login",
    params: [
      {
        name: "email",
        type: "string",
      },
      {
        name: "password",
        type: "string",
      }
    ]
  })

  public async loginRoute(params:{email:string,password:string}) { 
   return await loginUser(params.email, params.password)
  }
}
