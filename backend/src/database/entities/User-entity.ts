import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcrypt";
import { uid } from "uid";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_uid: string = uid(10);

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
}
