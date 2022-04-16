const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const {SECRET} = require("./config");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, SECRET);
}

class AuthController{

    async login(req, res){
        try{
            
            const {username, password} = req.body;
            const user = await User.findOne({where : {name : username}});
            if(!user){
                return res.status(400).json({"message" : "User is not exist"});
            }

            const isPasswordValid = bcrypt.compareSync(password, user.getDataValue("password"));
            if(!isPasswordValid){
                return res.status(400).json("Invalid password");
            }

            const token = generateAccessToken(user.getDataValue("id"), user.getDataValue("roles"));
            return res.json({token});

        } catch(e){
            console.log(e);
            res.status(400).json({message : 'Login error'});
        }
    }

    async registration(req, res){
        try{

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Invalid fields,", errors});
            }

            const {username, password} = req.body;
            const candidate = await User.findOne({ where : {name : username} });
            if(candidate){
                console.log(username, password, candidate);
                return res.status(400).json({message: "User already exist"});
            } 

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({where : {value : "USER"}});
            const user = User.build({name : username, password : hashPassword, roles: userRole.getDataValue("value")});
            user.save();

            res.status(200).json({message : "User has been created successfuly"});

        } catch(e){

            console.log(e);
            res.status(400).json({message : 'Registration error'});

        }
    }

    async getUsers(req, res){
        try{
            const users = await User.findAll();
            res.json(users);
            
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = new AuthController();