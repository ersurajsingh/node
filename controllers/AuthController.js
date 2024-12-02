const UserModel = require('../app/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req,res) => {
    try{
        const {name,showroomname, email, password} = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'Email already exists', success: false });
        }
        const userModel = new UserModel({ name, showroomname, email, password });
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({ message: 'User created successfully', success: true });
        } catch (err) {
            res.status(500)
            .json({ message: 'Error creating user', success: false });
        }
};

const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({ email });
        const errMsg = 'Invalid email or password';
        if (!user) {
            return res.status(403)
                .json({ message: errMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({ message: errMsg, success: false });
        }

        const jwtToken = jwt.sign(
            {email:user.email, _id:user._id},
            process.env.SECRET_KEY,
            {expiresIn:'1h'}); 
            res.status(200).json({ message: 'Logged in successfully', success: true, jwtToken, email,name:user.name});
            

        } catch (err) {
            res.status(500)
            .json({ message: 'Internal Server Errpr', success: false });
        }
};


module.exports = {
    signup,
    login
};