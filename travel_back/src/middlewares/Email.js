import { Verification_Email_Template, Welcome_Email_Template } from "../libs/EmailTemplate.js";
import { transporter } from "./Email.config.js";

export const SendVerificationCode = async(email,verificationCode)=>{
    try {
        const response = await transporter.sendMail({
            from: '"Travel Agency" <abraa.kaa.dabraaaaa@gmail.com>',
            to: email,
            subject: "Verify your Email",
            text: "Verify your Email",
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode),
          });
          console.log('Email send successfully',response) 
    } catch (error) {
        console.log('Email error')
    }
}

export const WelcomeEmail = async(email,username)=>{
    try {
        const response = await transporter.sendMail({
            from: '"Travel Agency" <abraa.kaa.dabraaaaa@gmail.com>', 
            to: email, 
            subject: "Verify your Email", 
            text: "Verify your Email", 
            html: Welcome_Email_Template.replace("{username}",username), 
          });
          res.status(200).json({ success: true, response })       
          console.log('Email send successfully',response) 
    } catch (error) {
        console.log('Email error')
    }
}