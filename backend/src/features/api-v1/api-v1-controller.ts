import Controller from "../../utils/decorators/controller-decorator";
import auth from "../../middlewares/permission-middleware";
import { ApiV1Routes } from "./api-v1-routes";

@Controller({
    name: "api-v1",
    router: ApiV1Routes,
    path: "/api/v1",
    permissions: [auth],
})
export default class ApiV1Controller  {

}

