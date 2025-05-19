import Controller from "../../utils/decorators/controller-decorator";
import {UserRoute} from "./user-routes";


@Controller({
    name: "user",
    router: UserRoute,
    path: "/user",
})
export default class UserController {

}