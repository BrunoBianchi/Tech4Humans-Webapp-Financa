import { Entity, PrimaryColumn } from "typeorm";
import { uid } from "uid";

@Entity()
export class Payment {
  @PrimaryColumn("varchar", { length: 14 })
  payment_id: string = `PAY_${uid(10)}`;
}
