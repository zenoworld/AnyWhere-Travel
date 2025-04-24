import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken";
import User from "../models/User.js";
import { SendVerificationCode, WelcomeEmail } from '../middlewares/Email.js';

//create new User
export const createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()

        res.status(200).json({ success: true, message: "successfully created", data: savedUser })
    } catch (err) {
        res.status(500).json({ success: false, message: "failed try again" });
    }
};

//update User 
export const updateUser = async (req, res) => {
    const id = req.params.id
    try {

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({ success: true, message: "successfully updated", data: updatedUser });

    } catch (err) {
        res.status(500).json({ success: false, message: "fail to update" });

    }
};

//delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {

        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "successfully deleted" });

    } catch (err) {
        res.status(500).json({ success: false, message: "fail to delete" });

    }
};

//getsingleUser
export const getSingleUser = async (req, res) => {
    const id = req.params.id
    try {

        const user = await User.findById(id);
        res.status(200).json(
            {
                success: true,
                message: "successfully ",
                data: user
            });

    }
    catch (err) {
        res.status(404).json(
            {
                success: false,
                message: "not found"
            });

    }
};

//getall User
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({role: "user"});
        res.status(200).json({
            success: true,
            message: "Successful",
            data: users,
        });
    } catch (err) {
        res.status(404).json(
            {
                success: false,
                message: "not found"
            });
    }
};

// get all admin    
export const getAllAdmin = async (req, res) => {
    try {
        const admins = await User.find({role: "admin"});
        res.status(200).json({
            success: true,
            message: "Successful",
            data: admins,
        });
    } catch (err) {
        res.status(404).json(
            {
                success: false,
                message: "not found"
            });
    }
};

export const userRegister = async (req, res) => {
    try {
        //hashing password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
            role: req.body.role,
            verificationCode
        })
        await newUser.save()
        SendVerificationCode(newUser.email, verificationCode)
        res.status(200).json({ success: true, message: "successfully created" })

    }
    catch (error) {
        res.status(500).json({ success: false, message: "fail to create" })

    }
}

export const VerifyEmail = async (req, res) => {

    try {
        const { code } = req.body
        const verifyUser = await User.findOne({
            verificationCode: code
        })
        if (!verifyUser) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Code" })
        }
        verifyUser.isVerified = true,
            verifyUser.verificationCode = undefined
        await verifyUser.save()
        WelcomeEmail(verifyUser.email, verifyUser.username)
        res.status(200).json({ success: true, message: "Email Verified Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const userLogin = async (req, res) => {
    const email = req.body.email;
    // const password=req.body.password;
    try {
        const user = await User.findOne({ email }).select('+role');;

        // If user doesn't exist
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check the password using bcrypt.compare
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        // If password is incorrect
        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }

        const { password, ...rest } = user._doc;
        const role = user.role

        // Create JWT token
        const token = Jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        // Set token in the browser cookie and send response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn // Set expiration time
        }).status(200).json({
            success: true,
            token,
            data: { ...rest },
            role,
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to login" });
    }
};