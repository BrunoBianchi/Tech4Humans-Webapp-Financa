import { BeforeInsert, Column, PrimaryColumn } from "typeorm";
import { uid } from "uid";
import { validate, ValidationError } from "class-validator";
import { ApiError } from "../../utils/class/errors-class";
export abstract class BaseEntity {
  @PrimaryColumn("varchar", { length: 30 })
  id: string = `${this.constructor.name.toUpperCase()}_${uid(10)}`;

  @Column()
  createdAt!: Date;
  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
  @BeforeInsert()
  async verifyEntity() {
    const errors = await validate(this, { forbidUnknownValues: false });
    if (errors.length > 0) {
      throw new ApiError(
        400,
        "Validation failed!",
        errors
          .map((error: ValidationError) => {
            return Object.values(error.constraints || {}).join(", ");
          })
          .join("; "),
      );
    }
  }
}
