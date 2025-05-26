import { BaseService } from "../../class/base-service-class";
import { Card } from "../../types/card-types";

class CardService extends BaseService<Card> {}

export const cardService = new CardService();
