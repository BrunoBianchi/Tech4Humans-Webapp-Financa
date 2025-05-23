import { AppDataSource } from "../../../database/configuration/data-source";
import { ApiError } from "../../class/errors-class";
import { getAccountById } from "../account/get-account-uid-service";

export const getCard = async (card_id: string, account_id: string) => {
  const cardRepository = AppDataSource.getRepository("Card");
  const account = await getAccountById(account_id);
  if (!account) throw new ApiError(404, "Couldn't find this Account !");
  const cardData = await cardRepository.findOne({
    where: { card_id: card_id },
    relations: ["account"],
  });
  if (!cardData) throw new ApiError(404, "Couldn't find this Card !");
  if (cardData.account.account_id !== account.account_id)
    throw new ApiError(401, "Card doesn't belong to this account !");
  return cardData;
};
