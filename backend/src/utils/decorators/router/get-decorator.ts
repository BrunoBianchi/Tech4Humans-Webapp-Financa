import { RequestHandler } from "express";

type param = {
  name: string;
  type: string;
  header?: boolean;
};

export function Get(params: {
  permissions?: Array<RequestHandler>;
  path: string;
  params?: Array<param>;
}): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = {
      function: originalMethod,
      method: "get",
      path: params.path,
      params: params.params || [],
      permissions: params.permissions || [],
    };

    return descriptor;
  };
}
