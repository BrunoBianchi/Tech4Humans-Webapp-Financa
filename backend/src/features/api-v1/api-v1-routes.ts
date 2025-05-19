import { Get } from "../../utils/decorators/router/get-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
@Router()
export  class ApiV1Routes { 
  @Get({
    path:'/',

  })
  public getIndex() {
    return "api-v1";
  }
}
