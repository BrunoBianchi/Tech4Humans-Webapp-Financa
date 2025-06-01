// filepath: d:\Desafios\Desafio-Webapp-Tech4humans\frontend\app\hooks\useAiInteraction.ts
import { useState, useCallback } from "react";
import { AiService } from "@/app/services/ai-service";
import { useCookies } from "react-cookie";

export function useAiInteraction() {
  const [responseAnalyzes, setResponseAnalyzes] = useState<string>("");
  const [responseChat, setResponseChat] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["token"]);

  const generateAnalyzes = useCallback(
    async (prompt: string) => {
      if (!cookies?.token) {
        setError("Token de autenticação não encontrado.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setResponseAnalyzes("");

      try {
        const aiResponse = await AiService.create(prompt, cookies.token);
        setResponseAnalyzes(aiResponse);
      } catch (err: any) {
        setError(err.message || "Ocorreu um erro ao comunicar com a IA.");
      } finally {
        setIsLoading(false);
      }
    },
    [cookies],
  );

    const sendMessage = useCallback(
    async (prompt: string) => {
      if (!cookies?.token) {
        setError("Token de autenticação não encontrado.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setResponseChat("");

      try {
        const aiResponse = await AiService.sendMessage(prompt, cookies.token);
        setResponseChat(aiResponse);
      } catch (err: any) {
        setError(err.message || "Ocorreu um erro ao comunicar com a IA.");
      } finally {
        setIsLoading(false);
      }
    },
    [cookies],
  );

  return { responseAnalyzes,responseChat, isLoading, error, sendMessage,generateAnalyzes };
}
