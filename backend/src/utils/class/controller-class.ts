import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import z, { ZodTypeAny } from "zod";
import { ApiError } from "./errors-class";

const simpleZodCreators = {
  string: z.string,
  number: z.number,
  boolean: z.boolean,
  date: z.date,
  bigint: z.bigint,
  undefined: z.undefined,
  null: z.null,
  void: z.void,
  any: z.any,
  unknown: z.unknown,
  never: z.never,
};

type SimpleZodCreatorKey = keyof typeof simpleZodCreators;

type Param = {
  name: string;
  type: SimpleZodCreatorKey;
  header?: boolean;
  required?: boolean;
};

type RouteDefinition = {
  method: keyof Router;
  path: string;
  permissions?: RequestHandler[];
  params?: Param[];
  header?: boolean;
  function: (object: unknown, req: Request, res: Response) => Promise<unknown>;
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
        (routerInstance as ClassDecorator).constructor?.prototype ||
        (routerInstance as unknown as { __proto__: unknown }).__proto__;

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

            (router[method] as (...unknown: unknown[]) => unknown)(
              route.path,
              route.permissions,
              async (req: Request, res: Response, next: NextFunction) => {
                const routeParams: Record<string, ZodTypeAny> = {};

                if (route.params && route.params.length > 0) {
                  route.params.forEach((param: Param) => {
                    // Linha original: let schema = (z as any)[param.type]();

                    // Obtenha a função criadora do nosso mapa seguro
                    const creatorFn = simpleZodCreators[param.type];

                    // creatorFn será do tipo (() => ZodString) | (() => ZodNumber) | ... etc.
                    // A chamada é segura e o tipo de 'schema' será inferido corretamente.
                    let schema: ZodTypeAny = creatorFn();

                    if (!param.required) {
                      schema = schema.optional();
                    }
                    routeParams[param.name] = schema;
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
                } catch (err: unknown) {
                  // Alterado de any para unknown para melhor prática
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
