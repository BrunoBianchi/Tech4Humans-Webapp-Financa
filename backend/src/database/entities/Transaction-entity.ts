import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Account } from "./Account-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { Category } from "./Category-entity";
@Entity()
export class Transaction extends BaseEntity {
  @Column()
  date!: Date;
  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }

  @Column()
  amount!: number;

  @Column()
  description?: string;

  @ManyToOne(() => Account, { nullable: false })
  sourceAccount!: Account;
  
  @Column()
  status: string = "pending";

  @ManyToOne(() => Account, { nullable: false })
  destinationAccount!: Account;

  @ManyToOne(() => Category, (category) => category.transaction)
  categorie!: Category;
}
