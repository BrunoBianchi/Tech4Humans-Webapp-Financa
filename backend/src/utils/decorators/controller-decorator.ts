import { RequestHandler } from "express";
import { ControllerClass } from "../class/controller-class";

function Controller(params: {
  name?: string;
  router: any;
  path: string;
  permissions?:Array<RequestHandler>
}):any {
  return function (target: Function) {
    return new ControllerClass(params);
  };
}

export default Controller;
