import { ObjectLiteral, Repository } from "typeorm";
import { AppDataSource } from "../../database/configuration/data-source";
import { ApiError } from "./errors-class";
export abstract class BaseService<T extends ObjectLiteral> {
  protected repository!: Repository<T>;
  constructor() {
    this.repository = AppDataSource.getRepository(
      this.constructor.name.split("Service")[0],
    );
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

      const result = await this.repository.find({
        where: whereCondition,
        relations: joins || [],
      });

      return result;
    } catch (error) {
      console.error("Query error:", error);
      throw new ApiError(500, `Error fetching data: ${error}`);
    }
  }
}
