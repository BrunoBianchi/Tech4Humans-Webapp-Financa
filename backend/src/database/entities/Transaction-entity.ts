import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,

} from "typeorm";
import { Account } from "./Account-entity";
import { BaseEntity } from "../baseEntity/base-entity";
@Entity()
export class Transaction extends BaseEntity {


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
