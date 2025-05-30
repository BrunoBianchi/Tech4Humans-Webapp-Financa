import { Column, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "../baseEntity/base-entity";
import { Card } from "./Card-entity";
import { Category } from "./Category-entity";
import { IsPositive } from "class-validator";
@Entity()
export class Budgets extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  @IsPositive()
  value!: number;

  @Column({ default: 0 })
  amount!: number;

  @OneToMany(() => Category, (category) => category.budget, { nullable: false })
  categories!: Category[];
}
