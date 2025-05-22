import { AppDataSource } from "../../../database/configuration/data-source";
import { Card } from "../../types/card-types";
export const createCard = async (card: Card) => {
  try {
    const cardrepository = AppDataSource.getRepository("Card");
    card.account = card.id;
    const newCard = cardrepository.create(card);
    await cardrepository.save(newCard);
    return newCard;
  } catch {
    return new Error("Card already exists");
  }
};
