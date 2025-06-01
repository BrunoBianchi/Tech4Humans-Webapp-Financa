const apiBaseUrl = "http://localhost:5000/api/v1";

export const AiService = {
  create: async (prompt: string, token: string) => {
    const response = await fetch(`${apiBaseUrl}/ai/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(
        `Erro ao comunicar com a IA: ${response.status} ${errorBody || response.statusText}`,
      );
    }

    const adviceText = await response.text();
    return adviceText;
  },

  sendMessage: async (prompt: string, token: string) => {
    const response = await fetch(`${apiBaseUrl}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(
        `Erro ao comunicar com a IA: ${response.status} ${errorBody || response.statusText}`,
      );
    }

    const adviceText = await response.text();
    return adviceText;
  },
};
