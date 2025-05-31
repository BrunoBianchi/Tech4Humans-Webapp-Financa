import { RequestHandler } from "express";

type param = {
  name: string;
  type: string;
   required?: boolean;
  header?: boolean;
};

export function Post(params: {
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

    Reflect.defineMetadata(
      "route:post",
      {
        function: originalMethod,
        method: "post",
        path: params.path,
        params: params.params,
        permissions: params.permissions || [],
      },
      target,
      propertyKey,
    );

    descriptor.value = {
      function: originalMethod,
      method: "post",
      path: params.path,
      params: params.params,
      permissions: params.permissions || [],
    };

    return descriptor;
  };
}
