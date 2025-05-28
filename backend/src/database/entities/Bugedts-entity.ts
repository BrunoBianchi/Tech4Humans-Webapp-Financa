import { Column, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "../baseEntity/base-entity";
import { Card } from "./Card-entity";
import { Category } from "./Category-entity";
@Entity()
export class Budgets extends BaseEntity {
  @Column()
  name!: string;
  @Column()
  value!: number;
  @Column()
  amount: number = 0;

  @ManyToMany(() => Card, (card) =>card.budgets)
  @JoinTable()
  cards!: Card[];

  @OneToMany(()=>Category, (category) => category.budget)
  categories!: Category[];
}
