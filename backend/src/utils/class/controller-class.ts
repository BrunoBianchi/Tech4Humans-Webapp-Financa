import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import z from "zod";
export class ControllerClass {
  constructor(params: {
    router: any;
    path: string;
    name?: string;
    permissions?: Array<RequestHandler>;
  }) {
    const r = Router();
    r.use(params.permissions || [(req:Request,res:Response,next: NextFunction) => {
      return next()
    }]);
    Object.keys(params.router.routes.prototype).forEach((route: any) => {
      route = params.router.routes.prototype[route];
      const method = route.method as keyof Router;
      (r[method] as Function)(route.path, (req: Request, res: Response) => {
        let routeParams: any = {};
        route.params?.forEach((r: any) => {
          routeParams[r.name] = (z as any)[r.type]();
        });
        try {
          const object =
            route.params && route.params.length > 0
              ? z.object(routeParams).parse(req.body)
              : {};
          res.status(200).json(route.function(object));
        } catch (err) {
          res.status(400).json("Bad Request");
        }
      });
    });

    r.use((req:Request,res:Response,next: NextFunction) => {
      res.status(404).send("Not Found");
    });
    this.router = r;
    this.name = params.name;
    this.path = params.path;
  }
  private router!: Router;
  private name?: string;
  private path!: string;
  public getRouter() {
    return {
      router: this.router,
      path: this.path,
      name: this.name,
    };
  }
}
