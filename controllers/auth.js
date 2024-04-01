const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.userName }, token });
};

const login = async (req, res) => {
    const {userName, password} = req.body;
    
    if(!userName || !password){
        throw new BadRequestError('Please provide User Name and password');
    }

    const user = await User.findOne({userName});

    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
    
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{userName: user.userName}, token});
};

module.exports = {
    register,
    login,
};

// KLIP OD 10H
// 7:37:00