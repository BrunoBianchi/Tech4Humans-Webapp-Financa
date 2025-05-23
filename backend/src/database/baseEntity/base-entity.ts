import { BeforeInsert, Column, PrimaryColumn } from "typeorm";
import { uid } from "uid";

export abstract class BaseEntity { 
    @PrimaryColumn("varchar", { length: 30 })
    id:string = `${this.constructor.name.toUpperCase()}_${uid(10)}`;

    @Column()
    created_at!: Date;
    @BeforeInsert()
    setCreatedAt() {
        this.created_at = new Date();
    }
}