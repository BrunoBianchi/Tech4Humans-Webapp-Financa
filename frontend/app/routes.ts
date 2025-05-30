import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("screens/home-route.tsx"),
  route("sign-in", "screens/sign-in-route.tsx"),
  route("login", "screens/login-route.tsx"),
  ...prefix("dashboard", [
    layout("screens/dashboard-layout.tsx", [
      index("screens/dashboard/dashboard-home-route.tsx"),
      ...prefix("contas", [
        layout("screens/dashboard/dashboard-account-layout.tsx", [
          route(
            ":id",
            "screens/dashboard/accounts/dashboard-account-route.tsx",
          ),
        ]),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
