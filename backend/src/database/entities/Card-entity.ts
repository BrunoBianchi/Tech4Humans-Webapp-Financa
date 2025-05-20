import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { uid } from "uid";
import { Account } from "./Account-entity";
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  card_uid: string = uid(10);

  @Column()
  card_number!: string;

  @Column()
  card_type!: string;

  @ManyToOne(() => Account, (account) => account.cards)
  account!: Account;
}
