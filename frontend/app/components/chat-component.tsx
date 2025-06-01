import { useState, useRef, useEffect } from "react";
import { useAccountContext } from "../contexts/account-context";
import { useAiInteraction } from "../hooks/ai-hook"; 

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { getAccountById } = useAccountContext(); 
  
  const { sendMessage, responseChat, isLoading, error } = useAiInteraction(); 
  const [isWaitingForBot, setIsWaitingForBot] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  let accountData: any;
  if (currentUrl.includes("/contas/")) {
    const accountId = currentUrl.split("/contas/")[1];
    if (accountId) {
      accountData = getAccountById(accountId);
    }
  }

  const [messages, setMessages] = useState([
    {
      from: "bot" as const,
      text: `Olá! Como posso te ajudar ?`,
      id: 1,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isWaitingForBot && !isLoading) { 
      
      if (responseChat) {
        setMessages((prev) => [...prev, {
          from: "bot" as const,
          text: (JSON.parse(responseChat)).choices[0].message.content|| "Desculpe, não consegui entender sua pergunta.",
          id: Date.now() + 1,
        }]);
      } else if (error) {
        console.error("Erro da IA no hook:", error);
        setMessages((prev) => [...prev, {
          from: "bot" as const,
          text: "Ocorreu um erro ao processar sua pergunta.",
          id: Date.now() + 1,
        }]);
      } else {
        console.warn("Resposta da IA não foi uma string válida ou estava vazia após carregamento:", responseChat);
        setMessages((prev) => [...prev, {
          from: "bot" as const,
          text: "Desculpe, não consegui processar sua pergunta no momento.",
          id: Date.now() + 1,
        }]);
      }
      setIsWaitingForBot(false); 
    }
  }, [responseChat, isLoading, isWaitingForBot, error]); 

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const newMessage = { from: "user" as const, text, id: Date.now() };
    setMessages((prev:any) => [...prev, newMessage]);
    setInputValue("");

    let prompt = `Ola, sou um usuario do TechFinance, preciso de ajuda com o seguinte assunto: ${text}.`;
    if (accountData) {
      prompt += ` Esses sao os dados disponiveis da conta atual: ${JSON.stringify(accountData)}`;
    }

    prompt += `${JSON.stringify(messages)}`;

    setIsWaitingForBot(true); 
    try {
      await sendMessage(prompt); 
                                 
    } catch (error) { 
      console.error("Erro ao chamar sendMessage:", error);
      setMessages((prev) => [...prev, {
        from: "bot" as const,
        text: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        id: Date.now() + 1,
      }]);
      setIsWaitingForBot(false);
    }
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className={`
          fixed bottom-6 right-6 z-50 
          bg-finance-primary hover:bg-finance-primary-dark 
          text-white p-4 rounded-full shadow-xl 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary
          transition-transform transform hover:scale-105
        `}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <i className="fas fa-times w-6 h-6" aria-hidden="true"></i>
        ) : (
          <i className="fas fa-comments w-6 h-6" aria-hidden="true"></i>
        )}
      </button>

      {isOpen && (
        <div
          className={`
            fixed bottom-20 right-6 z-40 
            w-80 h-96 bg-white rounded-xl shadow-2xl 
            flex flex-col overflow-hidden animate-fade-in
          `}
        >
          <div
            className={`
              bg-finance-primary text-white 
              px-4 py-3 flex justify-between items-center
            `}
          >
            <h2 className="text-lg font-semibold">TechFinace AI</h2>
            <button
              onClick={togglePopup}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Fechar chat"
            >
              <i className="fas fa-times w-5 h-5" aria-hidden="true"></i>
            </button>
          </div>

          <div
            className={`
              flex-1 px-4 py-3 overflow-y-auto 
              space-y-3 bg-finance-bg
            `}
          >
            {messages.map((msg:any) => (
              <div
                key={msg.id}
                className={`
                  flex ${msg.from === "user" ? "justify-end" : "justify-start"}
                `}
              >
                <div
                  className={`
                    max-w-[70%] 
                    ${
                      msg.from === "user"
                        ? "bg-finance-primary text-white rounded-xl rounded-br-none px-3 py-2"
                        : "bg-white text-gray-800 rounded-xl rounded-bl-none px-3 py-2 shadow-sm"
                    }
                  `}
                >
                  <p className="text-sm leading-snug">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="px-4 py-3 border-t border-gray-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua mensagem..."
              className={`
                flex-1 bg-white 
                border border-gray-300 rounded-lg 
                px-3 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-finance-primary
              `}
            />
            <button
              type="submit"
              className={`
                bg-finance-primary hover:bg-finance-primary-dark 
                text-white p-2 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-finance-primary
                transition-transform transform hover:scale-105
              `}
              aria-label="Enviar mensagem"
            >
              <i
                className="fas fa-paper-plane w-5 h-5 rotate-90"
                aria-hidden="true"
              ></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
