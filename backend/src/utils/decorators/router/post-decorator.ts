
type param = {
  name: string;
  type: string;
  required?: boolean;
};
export function Post(params: { path: string; params?: Array<param> }): any {
  return function (
    target: any,
    propertyKey: any,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = {
      function: originalMethod,
      method: "post",
      path: params.path,
      params: params.params,
    };
    return descriptor;
  };
}
