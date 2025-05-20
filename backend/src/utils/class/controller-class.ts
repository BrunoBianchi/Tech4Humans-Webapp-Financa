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
    
    r.use(params.permissions || [(req: Request, res: Response, next: NextFunction) => {
      return next();
    }]);

    if (!params.router) {
      throw new Error("Router não fornecido ao controlador");
    }

    if (typeof params.router === 'function') {
      params.router = new params.router();
    }
    
    const prototype = params.router.constructor?.prototype || params.router.__proto__;
    
    if (!prototype) {
      throw new Error("Não foi possível acessar o protótipo do router");
    }
    
    const propertyNames = Object.getOwnPropertyNames(prototype);
    
    propertyNames
      .filter(key => key !== 'constructor')
      .forEach((methodName: string) => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
        const route = descriptor?.value;
        
        if (route && route.method && route.path) {
          const method = route.method as keyof Router;
          
          (r[method] as Function)(route.path, async (req: Request, res: Response) => {
            let routeParams: any = {};
            
            if (route.params && route.params.length > 0) {
              route.params.forEach((param: any) => {
                routeParams[param.name] = (z as any)[param.type]();
              });
            }
            
            try {
              const object = route.params && route.params.length > 0
                ? z.object(routeParams).parse(req.body)
                : {};
              const result = await route.function.call(params.router, object)
              res.status(200).json(result)
            } catch (err) {
              res.status(400).json("Bad Request");
            }
          });
          
          console.log(`⚡ Method ${method.toUpperCase()} ${params.path}${route.path} registered`);
        }
      });

    r.use((req: Request, res: Response) => {
      res.status(404).send("404 Not Found");
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