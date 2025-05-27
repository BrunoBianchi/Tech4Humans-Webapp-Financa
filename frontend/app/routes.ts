import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home-route.tsx"),
  route("sign-in", "routes/sign-in-route.tsx"),
  route("login", "routes/login-route.tsx"),
  ...prefix("dashboard",[
    layout("routes/dashboard-layout.tsx",[
      index("routes/dashboard/dashboard-home-route.tsx"),
     ...prefix("contas", [ 
        layout("routes/dashboard/dashboard-account-layout.tsx", [ 
          index("routes/dashboard/accounts/dashboard-account-home-route.tsx")
        ])
     ])
    ]),
  ])
] satisfies RouteConfig;
