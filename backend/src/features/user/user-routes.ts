import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
import { User } from "../../utils/types/user-type";
import { createUser } from "../../utils/services/user/create-user-service";
import auth from "../../middlewares/permission-middleware";
import { loginUser } from "../../utils/services/user/login-user-service";
import { Request } from "express";
import { getNotification } from "../../utils/services/notification/get-notification-service";

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
    const data = {
      name: user.name,
      email: user.email,
      user_id: user.user_id,
    };
    return {
      authorization: await createUser(user),
      expiration: "1h",
      user: data,
    };
  }

  @Get({
    path: "/@",
    permissions: [auth],
  })
  public getMeUserRoute(_: unknown, req: Request) {
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
      },
    ],
  })
  public async loginRoute(params: { email: string; password: string }) {
    return await loginUser(params.email, params.password);
  }

    @Get({
    path: "/notification/:id",
    params:[
      {
        name: "id",
        type: "string",
        header: true,
      },
    ],
    permissions:[auth]
  })
public async getNotificationRoute(params: { id: string }) { 
    return await getNotification(params.id);
}


}
