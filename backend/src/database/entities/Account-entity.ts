import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User-entity";
import { Card } from "./Card-entity";
import { Transaction } from "./Transaction-entity";
import { Contact } from "./Contact-entity";
import { Investiment } from "./Investment-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { AccountType } from "../../utils/enums/account-enum";
import { IsNotEmpty, IsPositive } from "class-validator";
@Entity()
export class Account extends BaseEntity {
  @Column()
  @IsNotEmpty()
  bank!: string;

  @IsNotEmpty()
  @Column({ type: "enum", enum: AccountType })
  type!: string;

  @IsPositive()
  @Column()
  balance: number = 0;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @Column({ nullable: true })
  orcamento?: number;

  @OneToMany(() => Card, (card) => card.account)
  cards!: Card[];

  @OneToMany(() => Transaction, (tx) => tx.sourceAccount)
  outgoingTransactions!: Transaction[];

  @OneToMany(() => Transaction, (tx) => tx.destinationAccount)
  incomingTransactions!: Transaction[];

  @OneToMany(() => Contact, (contact) => contact.account)
  contacts!: Contact[];

  @OneToMany(() => Investiment, (investment) => investment.account)
  investments!: Investiment[];
}
