import { Get } from "../../../utils/decorators/router/get-decorator";
import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { categoryService } from "../../../utils/services/category/category-service";
import { Request } from "express";
@Router()
export class CategoryRoute{

    @Post({
        path:'/category',
        params:[
            {
                name:'name',
                type:'string',
            },

        ]
    })
    public async createCategoryRoute(params: { name: string },req:Request) { 
        return await categoryService.create({
            name:params.name
        },[{
            name: 'user',
            id: req.user!.id
        }])
    }
    @Get({
        path:'/categories'
    })
    public async getAllCategoriesRoute(_:any,req: Request) { 
        return await categoryService.getAllWithJoin('user',req.user!.id);
    }
}