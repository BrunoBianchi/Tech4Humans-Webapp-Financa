import { RouterClass } from "../../class/router-class";

export function Router(): ClassDecorator {
    return function (target: any) {
        const routerInstance = new RouterClass(target);
        
        Reflect.defineMetadata('isRouter', true, target);
        
        target.getInstance = function() {
            return routerInstance;
        };
        
        return target;
    };
}

export function getRouterInstance(target: any): RouterClass {
    return new RouterClass(target);
}