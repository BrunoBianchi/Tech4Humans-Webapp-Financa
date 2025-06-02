import {
  ObjectLiteral,
  Repository,
  FindOptionsWhere,
  EntityTarget,
  DeepPartial,
} from "typeorm";
import { ApiError } from "./errors-class";
import { validate, ValidationError } from "class-validator";
import { AppDataSource } from "../../database/configuration/data-source";

type ClassConstructor<T = object> = new (...args: unknown[]) => T;

export abstract class BaseService<T extends ObjectLiteral> {
  protected repository!: Repository<T>;
  private classValidator!: ClassConstructor<T>;

  constructor() {
    const entityName = this.constructor.name.split("Service")[0];
    this.repository = AppDataSource.getRepository(
      entityName as EntityTarget<T>,
    );

    const entities = AppDataSource.options.entities as
      | (ClassConstructor<unknown> | string)[]
      | undefined;

    if (entities) {
      const classValidatorInstance = entities.find(
        (classOrPath: ClassConstructor<unknown> | string) => {
          if (typeof classOrPath === "function") {
            return classOrPath.name === entityName;
          }
          return false;
        },
      );
      if (typeof classValidatorInstance === "function") {
        this.classValidator = classValidatorInstance as ClassConstructor<T>;
      } else {
        if (!this.classValidator) {
          const target = AppDataSource.getRepository(
            entityName as EntityTarget<T>,
          ).target;
          if (typeof target === "function") {
            this.classValidator = target as ClassConstructor<T>;
          } else {
            throw new Error(
              `Unable to determine class validator for ${entityName}`,
            );
          }
        }
      }
    } else {
      throw new Error("DataSource entities are not defined.");
    }
  }

  public async getById(
    id: string,
    relations?: string[],
  ): Promise<T | ApiError> {
    const object = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations: relations,
    });
    if (!object)
      throw new ApiError(
        404,
        `${this.constructor.name.split("Service")[0]} not found !`,
      );
    return object;
  }

  public async create(
    object: Partial<T>,
    relations?: Array<{
      name: string;
      id: string;
    }>,
  ): Promise<T> {
    const entityInstance = Object.assign(new this.classValidator(), object);
    let errors: ValidationError[] = await validate(entityInstance, {
      skipMissingProperties: false, 
    });
    errors = errors.filter((error: ValidationError) => {
      return error.property !== undefined;
    });
 
    if (errors.length > 0) {
      throw new ApiError(
        400,
        "Validation failed",
        errors
          .map(
            (e) =>
              `${e.property}: ${e.constraints ? Object.values(e.constraints).join(", ") : ""}`,
          )
          .join("; "),
      );
    }
    if (this.constructor.name.split("Service")[0] === "User") {
      const userRepository = AppDataSource.getRepository("User");
      const existingUser = await userRepository.findOneBy({
        email: (object as unknown as { email: string }).email,
      } as FindOptionsWhere<ObjectLiteral>);
      if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
      }
    }
    const relArray = Array.isArray(relations)
      ? await Promise.all(
          relations.map(async (relation) => {
            const relationRepository = AppDataSource.getRepository(
              relation.name,
            );
            const relatedEntity = await relationRepository.findOneBy({
              id: relation.id,
            } as FindOptionsWhere<ObjectLiteral>);
            return {
              [relation.name]: relatedEntity,
            };
          }),
        )
      : [];
    const rel = Object.assign({}, ...relArray);
    const newObject = this.repository.create({ ...object, ...rel } as T);
    const savedObject = await this.repository.save(newObject);
    return Array.isArray(savedObject) ? savedObject[0] : savedObject;
  }

  public async delete(
    id: string,
    account?: string,
    relations?: string[],
  ): Promise<T | ApiError> {
    try {
      const objectOrError = await this.getById(id, relations);
      if (objectOrError instanceof ApiError) {
        throw objectOrError;
      }
      const object = objectOrError as T;

      if (
        (object as unknown as { account: { id: string } }).account &&
        (object as unknown as { account: { id: string } }).account.id !==
          account
      )
        throw new ApiError(403, "You are not allowed to delete this object");
      await this.repository.remove(object);
      return object;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(404, err instanceof Error ? err.message : String(err));
    }
  }

  public async update(id: string, object: Partial<T>): Promise<T | ApiError> {
    // object can be Partial<T>
    try {
      const oldObjectOrError = await this.getById(id);
      if (oldObjectOrError instanceof ApiError) {
        throw oldObjectOrError;
      }
      const oldObject = oldObjectOrError as T; // Assert T

      const updatedObject = this.repository.merge(
        oldObject,
        object as DeepPartial<T>,
      );
      return await this.repository.save(updatedObject);
    } catch (err: unknown) {
      // Changed from any to unknown
      if (err instanceof ApiError) throw err;
      throw new ApiError(404, err instanceof Error ? err.message : String(err));
    }
  }

  public async getAllWithJoin(
    key: string,
    id: string,
    joins?: string[],
  ): Promise<T[] | ApiError> {
    try {
      let whereCondition: FindOptionsWhere<T> | FindOptionsWhere<T>[];

      if (key === "transaction") {
        whereCondition = [
          { sourceAccount: { id } } as unknown as FindOptionsWhere<T>,
          { destinationAccount: { id } } as unknown as FindOptionsWhere<T>,
        ];
      } else if (key === "user") {
        whereCondition = { user: { id } } as unknown as FindOptionsWhere<T>;
      } else {
        whereCondition = { [key]: { id } } as unknown as FindOptionsWhere<T>;
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
    } catch (error: unknown) {
      // Changed from any to unknown
      console.error("Query error:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new ApiError(500, `Error fetching data: ${errorMessage}`);
    }
  }
}
