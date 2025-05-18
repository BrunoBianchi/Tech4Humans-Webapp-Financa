import { RequestHandler, Router } from "express";
export class ControllerClass {
  constructor(params: { router: Router; path: string; name?: string, permissions?: Array<RequestHandler> }) {
    const r = Router();
    r.use(params.permissions || [()=>{}])
    r.use(params.router);
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
