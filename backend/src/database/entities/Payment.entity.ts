import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { Card } from "./Card-entity";
import { PaymentEnum } from "../../utils/enums/payment-enum";
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

  @Column({ type: "enum", enum: PaymentEnum })
  type!: string;

  @ManyToOne(() => Card, (card) => card.payments)
  card!: Card;
}
