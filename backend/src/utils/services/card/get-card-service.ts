import { AppDataSource } from "../../../database/configuration/data-source";
import { getAccountById } from "../account/get-account-uid-service";

export const getCard = async (card_id: string, account_id: string) => {
  try {
    const cardRepository = AppDataSource.getRepository("Card");
    const account = await getAccountById(account_id);
    const cardData = await cardRepository.findOne({
      where: { card_id: card_id },
      relations: ["account"],
    });
    if (!cardData) throw new Error("Card not found");
    if (cardData.account.account_id !== account.account_id)
      throw new Error("Card not found");
    return cardData;
  } catch (err) {
    throw new Error("Card not found");
  }
};
