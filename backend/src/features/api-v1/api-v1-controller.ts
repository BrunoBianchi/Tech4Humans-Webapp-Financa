import Controller from "../../utils/decorators/controller-decorator";
import auth from "../../middlewares/permission-middleware";
import {AccountRoute} from "./routes/account-route";
import { TransactionRoute } from "./routes/transactions-route";
import { cardRouter } from "./routes/card-route";

@Controller({
    name: "api-v1",
    routes: [AccountRoute,TransactionRoute,cardRouter],
    path: "/api/v1",
    permissions: [auth],
})

export default class ApiV1Controller  {

}

