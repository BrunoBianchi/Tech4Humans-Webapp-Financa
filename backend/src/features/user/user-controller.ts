import Controller from "../../utils/decorators/controller-decorator";
import userRoutes from "./user-routes";



@Controller({
    name: "user",
    router: userRoutes,
    path: "/user",
})
export default class UserController {

}