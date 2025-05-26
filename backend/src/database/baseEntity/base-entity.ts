import { BeforeInsert, Column, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { validate } from "class-validator";
import { ApiError } from "../../utils/class/errors-class";
export abstract class BaseEntity {
  @PrimaryColumn("varchar", { length: 30 })
  id: string = `${this.constructor.name.toUpperCase()}_${uid(10)}`;

  @Column()
  created_at!: Date;
  @BeforeInsert()
  setCreatedAt() {
    this.created_at = new Date();
  }
  @BeforeInsert() 
  async verifyEntity() {
    const errors = await validate(this, { forbidUnknownValues: false });
    if (errors.length > 0) {
      throw new ApiError(400, "Validation failed!", errors.map((err: any) => {
        return Object.values(err.constraints).join(", ");
      }).join("; "));
    }
  }
}
