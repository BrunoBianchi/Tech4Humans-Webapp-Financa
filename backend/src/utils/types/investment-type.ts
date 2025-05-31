import {
  InvestimentoBrasil,
  RentabilidadeMensalAproximada,
} from "../enums/investment-enum";

export type InvestmentType = {
  investmentId: string;
  investmentType: InvestimentoBrasil;
  approximatedMonthlyGains: RentabilidadeMensalAproximada;
  amount: number;
};
