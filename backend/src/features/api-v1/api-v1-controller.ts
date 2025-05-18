import apiRoutes from "./api-v1-routes";
import Controller from "../../utils/decorators/controller-decorator";
import auth from "../../middlewares/permission-middleware";

@Controller({
    name: "api-v1",
    router: apiRoutes,
    path: "/api/v1",
    permissions: [auth()],
})
export default class ApiV1Controller  {

}

