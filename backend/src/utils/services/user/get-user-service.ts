import { User } from "../../types/user-type"
import { AppDataSource } from "../../../database/configuration/data-source";
export const getUser= async (user:User)=>{
        const userRepository = AppDataSource.getRepository("User");
        const userData = await userRepository.findOneBy({email:user.email});
        if(!userData) throw new Error("User not found");
        return userData;
}