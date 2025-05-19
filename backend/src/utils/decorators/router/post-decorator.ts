type param = {
  name: string;
  type: string;
  required?: boolean;
};

export function Post(params: { path: string; params?: Array<param> }): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    Reflect.defineMetadata('route:post', {
      function: originalMethod,
      method: "post",
      path: params.path,
      params: params.params
    }, target, propertyKey);
    
    descriptor.value = {
      function: originalMethod,
      method: "post",
      path: params.path,
      params: params.params,
    };
    
    return descriptor;
  };
}