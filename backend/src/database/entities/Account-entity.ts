import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { uid } from "uid";
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  account_uid: string = uid(10);
}
