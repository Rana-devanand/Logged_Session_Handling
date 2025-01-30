const {user} = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {SALT} = require("../config/server.config")
const {JWT_SECRET_KEY} = require("../config/server.config")

class UserServices {
    async createUser(userData) {
        try {
            const hashedPassword = await this.hashedPassword(userData.Password);
            const updateUserData = {...userData, Password: hashedPassword};
            const response = await user.create(updateUserData);
            return response;
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

    async generate_JWT_Token(userEmail){
        console.log("Generating JWT token", userEmail)
        return jwt.sign(
            {
                email: userEmail,
                token: JWT_SECRET_KEY,
            },
            JWT_SECRET_KEY,
            { expiresIn: '10m' }  // Token will expire in 10 minutes
        )
    }

    verifyPassword(plainPassword , encryptedPassword){
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    }

    async loginUser(userData) {
        try {
           console.log(userData);
           const IsValidEmail = await user.findOne({
            where :{
                Email : userData.Email,
            }
           })
            if (!IsValidEmail) {
                throw new Error("Invalid email");
            }
            const IsValidPassword = this.verifyPassword(userData.Password , IsValidEmail.Password)
            if (!IsValidPassword) {
                throw new Error("Invalid password");
            }
           
            const token = await this.generate_JWT_Token(userData.Email);
            return {
                user : IsValidEmail,
                token: token,
            };
        } catch (error) {
            throw new Error("Failed to login user");
        }
    }
}

module.exports = UserServices;
