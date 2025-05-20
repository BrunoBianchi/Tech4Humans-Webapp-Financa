import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
@Router()
export  class ApiV1Routes { 
  @Post({
    path:'/account',
    params:[
      {
        name:"Bank",
        type:"string",
      },
      {
        name:"Type",
        type:"string",
      }
    ]
  })
  public getIndex() {
    return "api-v1";
  }
}
