import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Account } from "./Account-entity";
import { Payment } from "./Payment.entity";
import { CardEnum } from "../../utils/enums/card-enum";
import { BaseEntity } from "../baseEntity/base-entity";
import { IsPositive } from "class-validator";

@Entity()
export class Card extends BaseEntity {
  @Column()
  cardNumber!: string;

  @Column({ default: 10000 })
  @IsPositive()
  limit!: number;

  @Column({ type: "enum", enum: CardEnum })
  cardType!: string;

  @ManyToOne(() => Account, (account) => account.cards)
  account!: Account;

  @OneToMany(() => Payment, (payment) => payment.card)
  payments!: Payment[];
}
