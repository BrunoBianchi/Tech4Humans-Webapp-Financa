import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { uid } from "uid";
import { User } from "./User-entity";
import { Card } from "./Card-entity";
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  account_uid: string = uid(10);

  @Column()
  amount: number = 0;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @OneToMany(() => Card, (card) => card.account)
  cards!: Card[];
}
