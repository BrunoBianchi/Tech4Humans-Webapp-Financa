import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Transaction } from "./Transaction-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { Budgets } from "./Bugedts-entity";
import { User } from "./User-entity";

@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @ManyToOne(() => Budgets, (budgets) => budgets.categories, { nullable: true })
  budget!: Budgets;

  @OneToMany(() => Transaction, (transaction) => transaction.category, {
    nullable: true,
  })
  transaction!: Transaction[];

  @ManyToOne(() => User, (user) => user.categories, { nullable: false })
  user!: User;
}
