import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";
import { Account } from "./Account-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { Category } from "./Category-entity";
import { IsNotEmpty, IsPositive } from "class-validator";
import { CardEnum } from "../../utils/enums/card-enum";
@Entity()
export class Transaction extends BaseEntity {
  @Column()
  @IsNotEmpty()
  date!: Date;
  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }

  @Column({ nullable: false })
  @IsPositive()
  @IsNotEmpty()
  amount!: number;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Account, { nullable: false })
  sourceAccount!: Account;

  @Column({ type: "enum", enum: CardEnum, nullable: false })
  @IsNotEmpty()
  type!: string;

  @Column({ default: "pending" })
  status!: string;

  @ManyToOne(() => Account, { nullable: false })
  destinationAccount!: Account;

  @ManyToOne(() => Category, (category) => category.transaction, {
    nullable: true,
  })
  category!: Category | null;
}
