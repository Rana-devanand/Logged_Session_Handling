const UserServices = require('../services/user-services');
const userService = new UserServices();
const { validationResult } = require("express-validator");


const create = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error :errors.array()});
        }
        const response = await userService.createUser(req.body);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to Registered' });
    }
}

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        } 
        const response = await userService.loginUser(req.body.Email , req.body.Password);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to login' });
    }
}

const userprofile = async (req, res) =>{
    console.log(req.user)
    res.status(200).json({
        user: req.user,
    });
}

module.exports = {
    create,
    login,
    userprofile,
}