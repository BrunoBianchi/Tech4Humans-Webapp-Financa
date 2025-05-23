import { RouterClass } from "../../class/router-class";

export function Router(): ClassDecorator {
  return function (target: Function) {
    const routerInstance = new RouterClass(target);

    Reflect.defineMetadata("isRouter", true, target);

    (target as any).getInstance = function () {
      return routerInstance;
    };
  };
}

export function getRouterInstance(target: Function): RouterClass {
  return new RouterClass(target);
}
