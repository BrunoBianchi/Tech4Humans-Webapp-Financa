import { Column, Entity, ManyToOne } from "typeorm";
import { Account } from "./Account-entity";
import {
  InvestimentoBrasil,
  RentabilidadeMensalAproximada,
} from "../../utils/enums/investment-enum";
import { BaseEntity } from "../baseEntity/base-entity";

@Entity()
export class Investiment extends BaseEntity {
  @Column({ type: "enum", enum: InvestimentoBrasil })
  investmentType!: string;

  @Column({ type: "enum", enum: RentabilidadeMensalAproximada })
  approximatedMonthlyGains!: string;

  @Column()
  amount!: number;

  @ManyToOne(() => Account, (account) => account.investments)
  account!: Account;
}
