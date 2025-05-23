import { Column, Entity, ManyToOne} from "typeorm";
import { Card } from "./Card-entity";
import { PaymentEnum } from "../../utils/enums/payment-enum";
import { BaseEntity } from "../baseEntity/base-entity";
@Entity()
export class Payment extends BaseEntity {
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
