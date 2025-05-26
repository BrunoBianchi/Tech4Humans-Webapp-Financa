import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { Account } from "./Account-entity";
import { Notification } from "./Notification-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import {  IsEmail, Length } from "class-validator";
@Entity()
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  @IsEmail()
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
