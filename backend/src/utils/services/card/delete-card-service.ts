import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";
import { getCard } from "./get-card-service";

export const deleteCard = async (card_id: string, account_id: string) => {

    const card = await getCard(card_id, account_id);
    if (!card)  throw new ApiError(404, "Card not found !");
    const cardRepository = AppDataSource.getRepository("Card");
    await cardRepository.delete(card.card_id);
    return card;

};
