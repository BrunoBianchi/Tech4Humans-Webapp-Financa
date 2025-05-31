import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { Account } from "./Account-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Category } from "./Category-entity";
@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  @IsNotEmpty()
  name!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @Length(6)
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];

  @OneToMany(() => Category, (category) => category.user, { nullable: true })
  categories!: Category[];
}
