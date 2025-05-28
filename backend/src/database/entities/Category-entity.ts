import { Column, Entity, ManyToOne, OneToMany} from "typeorm";
import { Transaction } from "./Transaction-entity";
import { BaseEntity } from "../baseEntity/base-entity";
import { Budgets } from "./Bugedts-entity";

@Entity()
export class Category extends BaseEntity {
    @Column()
    name!: string;
    
    @ManyToOne(()=>Budgets, (budgets) => budgets.categories)
    budget!: Budgets;

    @OneToMany(()=>Transaction, (transaction) => transaction.categorie)
    transaction!: Transaction[];
}