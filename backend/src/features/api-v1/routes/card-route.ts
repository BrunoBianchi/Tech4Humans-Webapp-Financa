import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { Card } from "../../../utils/types/card-types";

@Router()
export class cardRouter {
  @Post({
    path: "/account/:id/card",
    params: [
      {
        name: "card_number",
        type: "string",
      },
      {
        name: "card_type",
        type: "string",
      },
      {
        name:"id",
        type:"string",
        header:true
      }
    ],
  })
  public createCardRoute(params:Card,_:Request) {
    return params;
  }
}
