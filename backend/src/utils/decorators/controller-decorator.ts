import { RequestHandler } from "express";
import { ControllerClass } from "../class/controller-class";

type ControllerParams = {
  name?: string;
  routes: Array<new () => object>;
  path: string;
  permissions?: Array<RequestHandler>;
};

function Controller(params: ControllerParams): ClassDecorator {
  return function (target: Function) {
    const controllerInstance = new ControllerClass(params);

    const newConstructor: any = function () {
      return controllerInstance;
    };

    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = newConstructor;

    newConstructor.getRouter = function () {
      return controllerInstance.getRouter();
    };

    return newConstructor as any;
  };
}

export default Controller;