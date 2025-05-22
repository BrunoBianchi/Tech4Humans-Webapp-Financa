import { AppDataSource } from "../../../database/configuration/data-source";
import { getCard } from "./get-card-service";

export const deleteCard = async (card_id: string, account_id: string) => {
  try {
    const card = await getCard(card_id, account_id);
    const cardRepository = AppDataSource.getRepository("Card");
    await cardRepository.delete(card.card_id);
    return card;
  } catch {
    throw new Error("Card not found");
  }
};
