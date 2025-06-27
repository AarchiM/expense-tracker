import { Router } from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
const routes = Router();

routes.post('/signUp', [
    body('email').isEmail().withMessage("Please Enter Correct Email!!"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters!!"),
], async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty)
    {
        return res.status(400).json({ error: errors.array() })
    }
    const { email, password, name } = req.body;
    try
    {
        const existUser = await User.findOne({ email });
        if (existUser)
        {
            return res.status(200).json({ message: "User Already Exist!!" });
        }
        const hashPass = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: hashPass
        })
        newUser.save();
        res.status(201).json({ success: true });
    } catch (error)
    {
        console.log("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

routes.post('/login', [
    body('email').isEmail().withMessage("Please Enter Correct Email!!"),
], async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
        const userExist = await User.findOne({ email });
        if (!userExist)
        {
            return res.status(400).json({ success: false, message: "User Not Found!!" });     
        }
        const passValidate = await bcrypt.compare(password, userExist.password);
        if (!passValidate)
        {
            return res.status(400).json({ success: false, message: "Incorrect Password!!" });     
        }

        res.status(200).json(userExist);


    } catch (error) {
        
    }
})

export default routes;