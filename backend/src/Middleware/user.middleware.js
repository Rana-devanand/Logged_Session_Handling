const jwt = require("jsonwebtoken");
const redisClient = require("../services/redis.services");

const userAuth = async (req, res , next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        // console.log("token - ",token);
        if (!token) {
            return res.status(401).send({
                message: "No token provided, authorization denied"
            })
        }
        const isBlackListed = await redisClient.get(token);
        if(isBlackListed) {
            return res.status(401).send({
                message: "Your account has been Logout, please loggedIn again"
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decode Token - ",decodedToken);
        if (!decodedToken) {
            return res.status(403).json({
                message: "Invalid token"
            })
        }

        // If everything is good, save to request for use in other routes
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("error" , error);
        res.status(403).send({
            message: "Failed to authenticate token"
        });
    }
}

module.exports = {
    userAuth,
};