const {user} = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {SALT} = require("../config/server.config")
const {JWT_SECRET_KEY} = require("../config/server.config")

class UserServices {
    async createUser(userData) {
        try {
            console.log("user data: ",userData);
            const UserPassword = userData.Password;
            console.log("User Password " ,UserPassword)
            const hashedPassword = await this.hashedPassword(UserPassword);

            const createUser = await user.create({
                Name : userData.Name,
                Email : userData.Email,
                Password : hashedPassword,
                CPassword : hashedPassword
            })
            const token = await this.generate_JWT_Token();
            console.log(token);
            return json({
                user : createUser,
                token : token,            
            });
        } catch (error) {
            console.error(error)
            throw new Error("Failed to create user")
        }
    }

    async hashedPassword(userPassword) {
        try {
            const hashedPassword = await bcrypt.hash(userPassword, SALT)
            return hashedPassword;
        } catch (error) {
            console.error(error)
            throw new Error("Failed to hash password")
        }
    }

    async generate_JWT_Token(){
        return jwt.sign({
            token : JWT_SECRET_KEY,
        })
    }
}

module.exports = UserServices;