import UserModel from "../models/user.models";


export const getUser = async (whereCondition: any) => {
    try {
        const user = UserModel.findOne(whereCondition);
        return user;
    } catch (error: any) {
        console.log("Error in getUser")
        throw new Error(error)
    }
}