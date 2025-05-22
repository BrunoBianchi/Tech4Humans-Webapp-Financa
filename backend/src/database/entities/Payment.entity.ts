import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { Card } from "./Card-entity";

enum PaymentType { 
  unique = "unico",
  recurring = "recorrente",
}
@Entity()
export class Payment {
  @PrimaryColumn("varchar", { length: 14 })
  payment_id: string = `PAY_${uid(10)}`;

  @Column()
  amount!: number;

  @Column()
  description!: string;

  @Column()
  date!: Date;

  @Column()
  who!: string;

  @Column({ type: "enum", enum: PaymentType })
  type!: string;

  @ManyToOne(() => Card, (card) => card.payments)
  card!: Card;
}
