import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { generateAiResponse } from "../../../utils/services/ai/ai-service";
@Router()
export class AiRoute {

@Post({
    path:'/ai/chat',
    params:[
        {
            name:'prompt',
            type:'string',
        },
    ],
})
public async genereteAiResponseRoute(params: { prompt: string, }) { 
    return await generateAiResponse(params.prompt);
}

}