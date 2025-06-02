import { Column, Entity, ManyToOne } from "typeorm";
import { Account } from "./Account-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { IsNotEmpty } from "class-validator";
@Entity()
export class Contact extends BaseEntity {
  @Column()
  @IsNotEmpty()
  name!: string;

  @Column()
   @IsNotEmpty()
  destinationAccountId!: string;

  @ManyToOne(() => Account, (account) => account.contacts)
  account!: Account;
}
