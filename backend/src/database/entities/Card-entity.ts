import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { uid } from "uid";
import { Account } from "./Account-entity";
@Entity()
export class Card {
  @PrimaryColumn("varchar", { length: 10 })
  card_id: string = uid(10);

  @Column()
  card_number!: string;

  @Column()
  card_type!: string;

  @ManyToOne(() => Account, (account) => account.cards)
  account!: Account;
}
