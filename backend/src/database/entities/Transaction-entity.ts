import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Account } from "./Account-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { Category } from "./Category-entity";
import { IsPositive } from "class-validator";
@Entity()
export class Transaction extends BaseEntity {
  @Column()
  date!: Date;
  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }

  @Column()
  @IsPositive()
  amount!: number;

  @Column()
  description?: string;

  @ManyToOne(() => Account, { nullable: false })
  sourceAccount!: Account;

  @Column({default: "pending"})
  status!: string;

  @ManyToOne(() => Account, { nullable: false })
  destinationAccount!: Account;

  @ManyToOne(() => Category, (category) => category.transaction)
  category!: Category;
}
