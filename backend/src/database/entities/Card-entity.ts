import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { Account } from "./Account-entity";
import { Payment } from "./Payment.entity";
enum CardType {
  DEBIT = "debito",
  CREDIT = "credito",
}

@Entity()
export class Card {
  @PrimaryColumn("varchar", { length: 15 })
  card_id: string = `CARD_${uid(10)}`;

  @Column()
  card_number!: string;

  @Column({ type: "enum", enum: CardType })
  card_type!: string;

  @ManyToOne(() => Account, (account) => account.cards)
  account!: Account;

  @OneToMany(() =>Payment, (payment) => payment.card)
  payments!: Payment[];
}
