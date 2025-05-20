import { Get } from "../../utils/decorators/router/get-decorator";
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
        required:true
      },
      {
        name:"Type",
        type:"string",
        required:true
      }
    ]
  })
  public getIndex() {
    return "api-v1";
  }
}
