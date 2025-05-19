import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";

@Router()
export class UserRoute {
  @Post({
    path: "/",
    params: [
      {
        name: "id",
        type: "string",
        required: true,
      },
      {
        name: "name",
        type: "string",
        required: true,
      },
    ],
  })
  public getIndex(params: any) {
    return JSON.stringify(params);
  }
  
  @Get({
    path: "/user2",
  })
  public get2Index() {
    return "a23";
  }
}