import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import z, { ZodTypeAny } from "zod";
import { ApiError } from "./errors-class";

type Param = {
  name: string;
  type: keyof typeof z;
  header?: boolean;
};

type RouteDefinition = {
  method: keyof Router;
  path: string;
  permissions?: RequestHandler[];
  params?: Param[];
  header?: boolean;
  function: (object: any, req: Request, res: Response) => Promise<any>;
};

type ControllerClassParams = {
  routes: Array<new () => object>;
  path: string;
  name?: string;
  permissions?: Array<RequestHandler>;
};

export class ControllerClass {
  private router: Router;
  private name?: string;
  private path: string;

  constructor(params: ControllerClassParams) {
    const router = Router();

    router.use(
      params.permissions || [
        (req: Request, res: Response, next: NextFunction) => next(),
      ],
    );

    if (
      !params.routes ||
      !Array.isArray(params.routes) ||
      params.routes.length === 0
    ) {
      throw new Error("No routes provided");
    }

    params.routes.forEach((RouteClass) => {
      const routerInstance = new RouteClass();
      const prototype =
        (routerInstance as any).constructor?.prototype ||
        (routerInstance as any).__proto__;

      if (!prototype) {
        throw new Error("Can't find prototype");
      }

      const propertyNames = Object.getOwnPropertyNames(prototype);

      propertyNames
        .filter((key) => key !== "constructor")
        .forEach((methodName: string) => {
          const descriptor = Object.getOwnPropertyDescriptor(
            prototype,
            methodName,
          );
          const route = descriptor?.value as RouteDefinition;
          if (route && route.method && route.path) {
            const method = route.method as keyof Router;

            (router[method] as Function)(
              route.path,
              route.permissions,
              async (req: Request, res: Response, next: NextFunction) => {
                const routeParams: Record<string, ZodTypeAny> = {};

                if (route.params && route.params.length > 0) {
                  route.params.forEach((param: Param) => {
                    routeParams[param.name] = (z as any)[param.type]();
                  });
                }
                try {
                  const shouldParseParams =
                    route.header === true ||
                    (route.params?.some(
                      (param: Param) => param.header === true,
                    ) ??
                      false);
                  const object =
                    route.params && route.params.length > 0
                      ? z
                          .object(routeParams)
                          .parse(
                            shouldParseParams
                              ? { ...req.body, ...req.params }
                              : req.body,
                          )
                      : {};
                  const result = await route.function.call(
                    routerInstance,
                    object,
                    req,
                    res,
                  );
                  res.status(200).json(result);
                } catch (err: any) {
                  next(err);
                }
              },
            );

            console.log(
              `⚡ Method ${method.toUpperCase()} ${params.path}${
                route.path
              } registered`,
            );
          }
        });
    });
    router.use(() => {
      throw new ApiError(404, "Page not found!");
    });

    this.router = router;
    this.name = params.name;
    this.path = params.path;
  }

  public getRouter() {
    return {
      router: this.router,
      path: this.path,
      name: this.name,
    };
  }
}
