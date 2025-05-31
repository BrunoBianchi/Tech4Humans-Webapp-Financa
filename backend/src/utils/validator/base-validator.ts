import { ObjectLiteral } from "typeorm";

export class BaseValidator<T extends ObjectLiteral>  {
    constructor(props:T) {
        console.log(props)
    }
}