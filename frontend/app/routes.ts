import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home-route.tsx"),
    route("sign-in", "routes/sign-in-route.tsx"),
route("login", "routes/login-route.tsx"),
] satisfies RouteConfig;
