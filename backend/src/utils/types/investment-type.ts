import { InvestimentoBrasil, RentabilidadeMensalAproximada } from "../enums/investment-enum";

export type InvestmentType = { 
    investment_id: string;
    investment_type:InvestimentoBrasil;
    approximated_monthly_gains: RentabilidadeMensalAproximada;
    amount: number;
}