import { RequestHandler, Router } from "express";
import { ControllerClass } from "../class/controller-class";

function Controller(params: {
  name?: string;
  router: Router;
  path: string;
  permissions?:Array<RequestHandler>
}):any {
  return function (target: Function) {
    return new ControllerClass(params);
  };
}

export default Controller;
