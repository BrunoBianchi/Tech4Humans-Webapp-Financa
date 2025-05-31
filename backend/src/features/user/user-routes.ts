import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
import { User } from "../../utils/types/user-type";
import { jwt_sign } from "../../utils/services/jwt/jwt-signin-service";
import auth from "../../middlewares/permission-middleware";
import { loginUser } from "../../utils/services/user/login-user-service";
import { Request } from "express";
import { notificationService } from "../../utils/services/notification/notification-service";
import { userService } from "../../utils/services/user/user-service";
import { Delete } from "../../utils/decorators/router/delete-decorator";
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
      user_id: user.id,
    };

    return {
      authorization:await jwt_sign(await userService.create(user),"7h"),
      expiration: "7h",
      user: data,
    };
  }

  @Get({
    path: "/@me",
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
    params: [
      {
        name: "id",
        type: "string",
        header: true,
      },
    ],
    permissions: [auth],
  })
  public async getNotificationRoute(params: { id: string }) {
    return await notificationService.getById(params.id);
  }

  @Delete({
    permissions: [auth],
    path:'/'
  })
  public async deleteNotificationRoute(_: unknown, req: Request) {
    return await userService.delete(req.user!.id);
  }
}
