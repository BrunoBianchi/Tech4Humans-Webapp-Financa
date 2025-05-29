import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Account } from "./Account-entity";
import { Payment } from "./Payment.entity";
import { CardEnum } from "../../utils/enums/card-enum";
import { BaseEntity } from "../baseEntity/base-entity";
import { Budgets } from "./Bugedts-entity";
import { IsPositive } from "class-validator";

@Entity()
export class Card extends BaseEntity {
  @Column()
  card_number!: string;

  @Column({ default: 10000 })
  @IsPositive()
  limit!: number;

  @Column({ type: "enum", enum: CardEnum })
  card_type!: string;

  @ManyToOne(() => Account, (account) => account.cards)
  account!: Account;

  @OneToMany(() => Payment, (payment) => payment.card)
  payments!: Payment[];
}
