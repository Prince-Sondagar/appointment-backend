import UserModel from "../models/user.models.js"

export const findUser = async(whereCondition) => {
    try {
        const user= UserModel.findOne(whereCondition);
        return user;
    } catch (error) {
        console.log("Error in findUser")
        throw new Error(error)
    }
}