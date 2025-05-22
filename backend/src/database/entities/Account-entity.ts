import { Column, Entity, In, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { User } from "./User-entity";
import { Card } from "./Card-entity";
import { Transaction } from "./Transaction-entity";
import { Contact } from "./Contact-entity";
import { Investiment } from "./Investment-entity";
enum AccountType {
  POUP = "poupanca",
  CORR = "corrente",
}
@Entity()
export class Account {
  @PrimaryColumn("varchar", { length: 15 })
  account_id: string = `ACC_${uid(10)}`;

  @Column()
  bank!: string;

  @Column({ type: "enum", enum: AccountType })
  type!: string;

  @Column()
  balance: number = 0;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @Column()
  orcamento!: number;

  @OneToMany(() => Card, (card) => card.account)
  cards!: Card[];

  @OneToMany(() => Transaction, (tx) => tx.sourceAccount)
  outgoingTransactions!: Transaction[];

  @OneToMany(() => Transaction, (tx) => tx.destinationAccount)
  incomingTransactions!: Transaction[];

  @OneToMany(() => Contact, (contact) => contact.account)
  contacts!: Contact[];

  @OneToMany(()=>Investiment, (investment) => investment.account)
  investments!: Investiment[];
}
