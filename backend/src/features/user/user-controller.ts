import Controller from "../../utils/decorators/controller-decorator";
import { UserRoute } from "./user-routes";

@Controller({
  name: "user",
  routes: [UserRoute],
  path: "/user",
})
export default class UserController {}
