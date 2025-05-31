import { BaseEntity, ObjectLiteral, Repository } from "typeorm";
import { ApiError } from "./errors-class";
import { validate } from "class-validator";
import { AppDataSource } from "../../database/configuration/data-source";
export abstract class BaseService<T extends ObjectLiteral> {
  protected repository!: Repository<T>;
  private classValidator!: any;
  constructor() {
    this.repository = AppDataSource.getRepository(
      this.constructor.name.split("Service")[0],
    );
    const entities = AppDataSource.options.entities;
    const classValidator = (entities as []).find(
      (classConstructor: ClassDecorator) => {
        return (
          classConstructor.name == this.constructor.name.split("Service")[0]
        );
      },
    );
    this.classValidator = classValidator;
  }

  public async getById(
    id: string,
    relations?: string[],
  ): Promise<T | ApiError> {
    const object = await this.repository.findOne({
      where: { id } as any,
      relations,
    });
    if (!object)
      throw new ApiError(
        404,
        `${this.constructor.name.split("Service")[0]} not found !`,
      );
    return object;
  }

  public async create(
    object: T,
    relations?: Array<{
      name: string;
      id: string;
    }>,
  ): Promise<T> {
    const entityInstance = Object.assign(new this.classValidator(), object);
    let errors = await validate(entityInstance, {
      skipMissingProperties: false,
    });
    errors = errors.filter((error) => {
      return error.property != undefined;
    });
    if (errors.length > 0) {
      throw new ApiError(400, "Validation failed", errors.toString());
    }
    if (this.constructor.name.split("Service")[0] == "User") {
      const userRepository = AppDataSource.getRepository("User");
      const existingUser = await userRepository.findOne({
        where: { email: object.email },
      });
      if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
      }
    }
    const relArray = relations
      ? await Promise.all(
          relations.map(async (relation) => {
            const relation_repository = AppDataSource.getRepository(
              relation.name,
            );
            return {
              [relation.name]: await relation_repository.findOneBy({
                id: relation.id,
              }),
            };
          }),
        )
      : [];
    const rel = Object.assign({}, ...relArray);
    const newObject = this.repository.create({ ...object, ...rel });
    const savedObject = await this.repository.save(newObject);
    return Array.isArray(savedObject) ? savedObject[0] : savedObject;
  }

  public async delete(
    id: string,
    account?: string,
    relations?: string[],
  ): Promise<T | ApiError> {
    try {
      const object = (await this.getById(id, relations)) as T;
      if (object.account && object.account.id !== account)
        throw new ApiError(403, "You are not allowed to delete this object");
      await this.repository.remove(object as T);
      return object;
    } catch (err: any) {
      throw new ApiError(404, err.toString());
    }
  }

  public async update(id: string, object: T): Promise<T | ApiError> {
    try {
      const oldObject = await this.getById(id);
      const updatedObject = this.repository.merge(oldObject as T, object);
      return await this.repository.save(updatedObject);
    } catch (err: any) {
      throw new ApiError(404, err.toString());
    }
  }

  public async getAllWithJoin(
    key: string,
    id: string,
    joins?: string[],
  ): Promise<T[] | ApiError> {
    try {
      let whereCondition: any;

      if (key === "transaction") {
        whereCondition = [
          { sourceAccount: { id } },
          { destinationAccount: { id } },
        ];
      } else if (key === "user") {
        whereCondition = { user: { id } };
      } else {
        whereCondition = { [key]: { id } };
      }

      const effectiveJoins = joins ? [...joins] : [];

      const entityName = this.repository.metadata.name;

      if (entityName === "Account") {
        if (
          effectiveJoins.includes("incomingTransactions") &&
          !effectiveJoins.includes("incomingTransactions.category")
        ) {
          effectiveJoins.push("incomingTransactions.category");
        }
        if (
          effectiveJoins.includes("outgoingTransactions") &&
          !effectiveJoins.includes("outgoingTransactions.category")
        ) {
          effectiveJoins.push("outgoingTransactions.category");
        }
      }

      const result = await this.repository.find({
        where: whereCondition,
        relations: effectiveJoins,
      });

      return result;
    } catch (error) {
      console.error("Query error:", error);
      throw new ApiError(500, `Error fetching data: ${error}`);
    }
  }
}
