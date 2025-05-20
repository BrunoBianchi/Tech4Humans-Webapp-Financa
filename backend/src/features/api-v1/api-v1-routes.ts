import { isUserOwner } from "../../middlewares/user-own-account-middleware";
import { Get } from "../../utils/decorators/router/get-decorator";
import { Post } from "../../utils/decorators/router/post-decorator";
import { Router } from "../../utils/decorators/router/router-decorator";
import { createAccount } from "../../utils/services/account/create-account-service";
import { Request } from "express";
import { Account } from "../../utils/types/account-type";
import { getAccountById  } from "../../utils/services/account/get-account-uid-service";
@Router()
export  class ApiV1Routes { 
  @Post({
    path:'/account',
    params:[
      {
        name:"bank",
        type:"string",
      },
      {
        name:"type",
        type:"string",
      },
      {
        name:"amount",
        type:"number",
      }
    ]
  })
  public async createNewAccount(Account:Account,req:Request) {
    return await createAccount(Account,req.user!.user_id);
  }
  @Get({
    path:'/account/:id',
    params:[
      {
        name:"id",
        type:"string",
        header:true
      }
    ],
    permissions:[isUserOwner]
  })
  public async getAccount(params:{id:string},_:Request){
    return await getAccountById (params.id)
  }
}
