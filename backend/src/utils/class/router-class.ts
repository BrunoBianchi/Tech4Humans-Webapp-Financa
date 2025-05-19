export class RouterClass {
  private routes: any;
  
  constructor(routes: any) {
    this.routes = routes;
  }
  
  public getRoutes() {
    return this.routes;
  }
}