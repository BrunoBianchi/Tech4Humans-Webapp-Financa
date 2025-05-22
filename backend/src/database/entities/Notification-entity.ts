import { Column, Entity, ManyToOne,  PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { User } from "./User-entity";

@Entity()
export class Notification {
    @PrimaryColumn("varchar", { length: 16 })
    notification_id: string = `NOTIF_${uid(10)}`;

    @Column()
    description!:string;

    @Column()
    date!: Date;

    @ManyToOne(()=>User ,(user)=>user.notifications)
    user!: User;
}
