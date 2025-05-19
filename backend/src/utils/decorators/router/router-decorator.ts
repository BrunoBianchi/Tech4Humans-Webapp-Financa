import { RouterClass } from "../../class/router-class"

export function Router():any {
    return function(target:any) {   
        return new RouterClass(target);
    }

}