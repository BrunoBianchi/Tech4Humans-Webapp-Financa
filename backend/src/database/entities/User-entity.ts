import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import { uid } from "uid";
import { Account } from "./Account-entity";
import { Notification } from "./Notification-entity";
@Entity()
export class User {
  @PrimaryColumn("varchar", { length: 15 })
  user_id: string = `USER_${uid(10)}`;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];
}
