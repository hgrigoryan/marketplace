import User from "../schemas/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


async function register(req, res){
    try{
        if(!req.body.email || !req.body.password) {
            throw new Error('Required fields are empty');
        }

        const email = await User.findOne({email: req.body.email});
        if(email !== null){
            throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user =  new User({
            email: req.body.email,
            password: hashedPassword
        });
        
        await user.save();

        const token = jwt.sign({ id: user.id, type: user.type }, process.env.ACCESS_TOKEN_SECRET);
        res.status("201")
        .cookie("AccessToken", token, { httpOnly: true})
        .send('User registered');

    }catch(err){
        res.json(err);
    };
}

async function login(req, res){
    try{
        if(!req.body.email || !req.body.password){
            throw new Error('Required fields are empty');
        }
        const user =  await User.findOne({email: req.body.email});
        // If email is in db check password
        if(user === null || !(await bcrypt.compare(req.body.password, user.password))){
            throw new Error('Incorrect Email or Password');
        }

        const token = jwt.sign({ id: user.id, type: user.type }, process.env.ACCESS_TOKEN_SECRET);
        res.status("200")
        .cookie("AccessToken", token, { httpOnly: true})
        .send('User loged in sccessfully');
           
    }catch(err){
        res.json(err);
    }
    
}

async function logout(req, res){
    res.status("200").cookie("AccessToken", "", { httpOnly: true});
}

export default {
    register,  
    login,
    logout
};