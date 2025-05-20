import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { User } from "./User-entity";
import { Card } from "./Card-entity";
import { Transaction } from "./Transaction-entity";
@Entity()
export class Account {
  @PrimaryColumn("varchar", { length: 10 })
  account_id: string = uid(10);

  @Column()
  bank!: string;

  @Column()
  type!: string;

  @Column()
  balance: number = 0;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @OneToMany(() => Card, (card) => card.account)
  cards!: Card[];

  @OneToMany(() => Transaction, (tx) => tx.sourceAccount)
  outgoingTransactions!: Transaction[];

  @OneToMany(() => Transaction, (tx) => tx.destinationAccount)
  incomingTransactions!: Transaction[];
}
