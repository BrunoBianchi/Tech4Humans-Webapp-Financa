import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { uid } from "uid";
import { Account } from "./Account-entity";
@Entity()
export class Transaction {
  @PrimaryColumn("varchar", { length: 18 })
  transaction_id: string = `TRANSAC_${uid(10)}`;

  @Column()
  date!: Date;
  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }

  @Column()
  amount!: number;

  @Column()
  description?: string;

  @ManyToOne(() => Account, { nullable: false })
  sourceAccount!: Account;

  @ManyToOne(() => Account, { nullable: false })
  destinationAccount!: Account;
}
