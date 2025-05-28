import { Column, ManyToOne,Entity } from "typeorm";
import { BaseEntity } from "../baseEntity/base-entity";
import { User } from "./User-entity";
@Entity()
export class Bugedts extends BaseEntity {
  @Column()
  name!: string;
  @Column()
  category!: string;
  @Column()
  value!: number;
  @Column()
  amount!: number;

  @ManyToOne(()=>User, (user) => user.bugedts)
  user!: User;
}
