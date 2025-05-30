// filepath: d:\Desafios\Desafio-Webapp-Tech4humans\frontend\app\hooks\useAiInteraction.ts
import { useState, useCallback } from 'react';
import { AiService } from '@/app/services/ai-service';
import { useCookies } from 'react-cookie';

export function useAiInteraction() {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["token"]);

  const sendMessage = useCallback(async (prompt: string) => {
    if (!cookies?.token) {
      setError("Token de autenticação não encontrado.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(""); 

    try {
      const aiResponse = await AiService.create(prompt, cookies.token);
      setResponse(aiResponse);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao comunicar com a IA.");
    } finally {
      setIsLoading(false);
    }
  }, [cookies]); 

  return { response, isLoading, error, sendMessage };
}