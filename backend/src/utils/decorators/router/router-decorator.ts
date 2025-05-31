import { RouterClass } from "../../class/router-class";

export function Router(): ClassDecorator {
  return function (target: unknown) {
    const routerInstance = new RouterClass(target);

    Reflect.defineMetadata("isRouter", true, target as ClassDecorator);

    (target as unknown as { getInstance: unknown }).getInstance = function () {
      return routerInstance;
    };
  };
}

export function getRouterInstance(target: unknown): RouterClass {
  return new RouterClass(target);
}
