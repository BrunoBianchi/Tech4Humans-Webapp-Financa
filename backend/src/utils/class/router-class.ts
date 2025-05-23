export class RouterClass {
  private routes: unknown;

  constructor(routes: unknown) {
    this.routes = routes;
  }

  public getRoutes() {
    return this.routes;
  }
}
