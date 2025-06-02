import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Transaction } from "./Transaction-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { User } from "./User-entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Category extends BaseEntity {
  @Column()
  @IsNotEmpty()
  name!: string;
  @OneToMany(() => Transaction, (transaction) => transaction.category, {
    nullable: true,
  })
  transaction!: Transaction[];

  @ManyToOne(() => User, (user) => user.categories, { nullable: false })
  user!: User;
}
