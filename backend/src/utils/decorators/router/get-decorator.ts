type param = {
  name: string;
  type: string;
  required?: boolean;
};

export function Get(params: { path: string; params?: Array<param> }): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = {
      function: originalMethod,
      method: "get",
      path: params.path,
      params: params.params || [],
    };
    
    return descriptor;
  };
}