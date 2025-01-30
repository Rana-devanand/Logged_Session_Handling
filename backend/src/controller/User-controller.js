const UserServices = require('../services/user-services');
const userService = new UserServices();

const create = async(req, res) => {
    try {
        const response = await userService.createUser(req.body);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const response = await userService.loginAsync(req.body);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create,
    login,
}