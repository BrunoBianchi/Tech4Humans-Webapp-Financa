import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { Account } from "./Account-entity";

enum InvestimentoBrasil {
  TESOURO_DIRETO = "TD",
  CDB = "CDB",
  LCI = "LCI",
  LCA = "LCA",
  CRI = "CRI",
  CRA = "CRA",
  DEBENTURE = "DEB",
  ACOES = "ACAO",
  FII = "FII",
  ETF = "ETF",
  BDR = "BDR",
  FUNDO_DE_INVESTIMENTO = "FMI",
  PREVIDENCIA_PRIVADA = "PVP",
  POUPANCA = "POU",
  CAMBIO = "CAM",
  CRYPTO = "CRY",
}
enum RentabilidadeMensalAproximada {
  TESOURO_DIRETO = "0.9",
  CDB = "1.0",
  LCI = "0.85",
  LCA = "0.85_LCA",
  CRI = "1.1",
  CRA = "1.1_CRA",
  DEBENTURE = "1.2",
  ACOES = "1.5",
  FII = "0.9_FII",
  ETF = "1.3",
  BDR = "1.4",
  FUNDO_DE_INVESTIMENTO = "1.0_FMI",
  PREVIDENCIA_PRIVADA = "0.8",
  POUPANCA = "0.5",
  CAMBIO = "0.0",
  CRYPTO = "5.0",
}

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
