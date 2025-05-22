import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { Account } from "./Account-entity";
@Entity()
export class Contact {
    @PrimaryColumn("varchar", { length: 19 })
    contact_id: string = `CONTACT_${uid(10)}`;

    @Column()
    name!: string;

    @Column()
    destination_account_id!: string;

    @ManyToOne(()=>Account,(account)=>account.contacts)
    account!: Account;
}