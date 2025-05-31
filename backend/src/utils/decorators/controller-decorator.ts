import { RequestHandler } from "express";
import { ControllerClass } from "../class/controller-class";

type ControllerParams = {
  name?: string;
  routes: Array<new () => object>;
  path: string;
  permissions?: Array<RequestHandler>;
};

interface ControllerStatic {
  new (...args: unknown[]): object;
  getRouter?: () => unknown;
}

function Controller(params: ControllerParams) {
  return function <T extends ControllerStatic>(target: T): T {
    const controllerInstance = new ControllerClass(params);

    const newConstructor = class extends (target as new (
      ...args: unknown[]
    ) => object) {
      constructor(...args: unknown[]) {
        super(...args);
        return controllerInstance;
      }
    } as T;

    Object.setPrototypeOf(newConstructor, target);

    newConstructor.getRouter = () => {
      return controllerInstance.getRouter();
    };

    Object.defineProperty(newConstructor, "name", {
      value: target.name,
      writable: false,
      configurable: true,
    });

    return newConstructor;
  };
}

export default Controller;
