import { Column, Entity, ManyToOne } from "typeorm";
import { Account } from "./Account-entity";
import { BaseEntity } from "../baseEntity/base-entity";
@Entity()
export class Contact extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  destinationAccountId!: string;

  @ManyToOne(() => Account, (account) => account.contacts)
  account!: Account;
}
