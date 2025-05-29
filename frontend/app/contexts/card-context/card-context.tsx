import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { cardService } from "@/app/services/card-service";
import type { Card } from "@/app/types/card-type";
import { useParams } from "react-router";
import { useToast } from "../toast-context/toast-context";

type CardContextType = {
  cards: Card[];
  addCard: (card:Card,account_id:string) => void;
  removeCard: (card_id: string,account_id:string) => void;
  loading: boolean;
  getCardById: (id: string) => Card | null;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
    const { addToast } = useToast();

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    checkCardStatus();
  }, []);

  const addCard = (card:Card,account_id:string) => {
   cardService.create(card, cookies.token,account_id).then((card:Card) => {
      setCards((prev) => [...prev, card]);
    }).catch((error)=>{
        addToast(error.message, "error");
    }).then(()=>{
      addToast("Cartao adicionado com sucesso!" , "success");
    })
  };

  const removeCard = (card_id: string,account_id:string) => {
    cardService.delete(account_id,card_id, cookies.token).then(() => {
      setCards((prev) => prev.filter((card:Card) => card.id !== card_id));
    }).then(()=>{
        addToast("Cartao removido com sucesso!" , "success");
    }).catch((error)=>{
        addToast(error.message, "error");
    });
  };

  const checkCardStatus = async () => {
    setLoading(true);
    const token = cookies.token;

    const data = await cardService.getAll(token,params.id || "");
    setCards(data);
    setLoading(false);
  };

  const getCardById = (id: string) => {
    setLoading(true);
    return cards.find((card:Card) =>card.id === id) || null;
  };

  return (
    <CardContext.Provider
      value={{ cards, addCard, removeCard, loading, getCardById }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};
