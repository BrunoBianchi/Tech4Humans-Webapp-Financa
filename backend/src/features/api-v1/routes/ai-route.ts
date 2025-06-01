import { Post } from "../../../utils/decorators/router/post-decorator";
import { Router } from "../../../utils/decorators/router/router-decorator";
import { generateAiAnalyzeResponse,generateAiChatResponse } from "../../../utils/services/ai/ai-service";
@Router()
export class AiRoute {
  @Post({
    path: "/ai/analyze",
    params: [
      {
        name: "prompt",
        type: "string",
      },
    ],
  })
  public async genereteAiAnalyzeResponseRoute(params: { prompt: string }) {
    return await generateAiAnalyzeResponse(params.prompt);
  }

    @Post({
    path: "/ai/chat",
    params: [
      {
        name: "prompt",
        type: "string",
      },
    ],
  })
  public async genereteAiChatResponseRoute(params: { prompt: string }) {
    return await generateAiChatResponse(params.prompt);
  }
}
