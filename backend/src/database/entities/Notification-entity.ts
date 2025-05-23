import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { User } from "./User-entity";
import { BaseEntity } from "../baseEntity/base-entity";

@Entity()
export class Notification extends BaseEntity {

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  date!: Date;
  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }
  @ManyToOne(() => User, (user) => user.notifications)
  user!: User;
}
