import { RequestHandler } from "express";
import { ControllerClass } from "../class/controller-class";

function Controller(params: {
  name?: string;
  router: any;
  path: string;
  permissions?: Array<RequestHandler>
}): ClassDecorator {
  return function (target: Function) {
    if (typeof params.router === 'function') {
      params.router = new params.router();
    }
    
    const controllerInstance = new ControllerClass(params);
    
    const newConstructor: any = function() {
      return controllerInstance;
    };
    
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = newConstructor;
    
    newConstructor.getRouter = function() {
      return controllerInstance.getRouter();
    };
    
    return newConstructor as any;
  };
}

export default Controller;