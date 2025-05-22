import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { uid } from "uid";
import { User } from "./User-entity";

@Entity()
export class Notification {
  @PrimaryColumn("varchar", { length: 16 })
  notification_id: string = `NOTIF_${uid(10)}`;

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
