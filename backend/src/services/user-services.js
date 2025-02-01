const {user} = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {SALT} = require("../config/server.config")
const {JWT_SECRET_KEY} = require("../config/server.config")

class UserServices {
    async createUser(userData) {
        try {
            const response = await user.create(userData);
            return response;
        } catch (error) {
            console.error(error)
            throw new Error("Failed to create user")
        }
    }

    async generate_JWT_Token(userEmail){
        // console.log("Generating JWT token", userEmail)
        return jwt.sign(
            {
                email: userEmail,
                token: JWT_SECRET_KEY,
            },
            JWT_SECRET_KEY,
            { expiresIn: '10m' }  // Token will expire in 10 minutes
        )
    }

    async verifyPassword (plainPassword , hashPassword) { 
        const isMatch = await bcrypt.compare(plainPassword, hashPassword)
        return isMatch // true or false
    }

   async getByEmail(email){
    try {
         return await user.findOne({ where: { email } });
    } catch (error) {
         console.log("Something went wrong in getByEmail", error);
    }
   }

   async loginUser(email, plainPassword) {
    try {

         const isValidEmail = await this.getByEmail(email);
         
         if(!isValidEmail) {
              return { error : "Email does't exist!"}
         }

         const passwordMatch = await this.verifyPassword(
              plainPassword,
              isValidEmail.Password,
         )
         console.log("Passwords match ", passwordMatch);

         if (!passwordMatch) {
              return { error: 'Password does not match' }
         }

         const token = await this.generate_JWT_Token(email);
         return { 
                user: isValidEmail, 
                token: token,
            }
    } catch (error) {
         console.log("Something went wrong in service", error);
    }
}
}

module.exports = UserServices;
