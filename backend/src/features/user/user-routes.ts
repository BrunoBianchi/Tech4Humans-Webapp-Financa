import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
import { User } from "../../utils/types/user-type";
import { jwtSign } from "../../utils/services/jwt/jwt-signin-service";
import auth from "../../middlewares/permission-middleware";
import { loginUser } from "../../utils/services/user/login-user-service";
import { Request } from "express";
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
      userID: user.id,
    };

    return {
      authorization: await jwtSign(await userService.create(user), "7h"),
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

  @Delete({
    permissions: [auth],
    path: "/",
  })
  public async deleteUser(_: unknown, req: Request) {
    return await userService.delete(req.user!.id);
  }
}
