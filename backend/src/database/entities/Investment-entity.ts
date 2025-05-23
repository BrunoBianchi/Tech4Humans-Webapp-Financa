import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { Account } from "./Account-entity";
import {
  InvestimentoBrasil,
  RentabilidadeMensalAproximada,
} from "../../utils/enums/investment-enum";

@Entity()
export class Investiment {
  @PrimaryColumn("varchar", { length: 16 })
  investment_id: string = `INVES_${uid(10)}`;

  @Column({ type: "enum", enum: InvestimentoBrasil })
  investment_type!: string;

  @Column({ type: "enum", enum: RentabilidadeMensalAproximada })
  approximated_monthly_gains!: string;

  @Column()
  amount!: number;

  @ManyToOne(() => Account, (account) => account.investments)
  account!: Account;
}
