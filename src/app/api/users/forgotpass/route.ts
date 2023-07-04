import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

connect();

export async function POST(req:NextRequest) {
    try {
        const reqBody = await req.json();
        const {token, newPass} = reqBody;
        console.log(token,"--->",newPass);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() }});

        if (!user) {
            return NextResponse.json({error: "Invalid Token"}, {status: 400});
        }

        console.log(user);

        const hashedPassword = await bcryptjs.hash(newPass,10);
        
        // update password in db and remove token fields for security reasons
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password Changed Successfully",
            success: true,
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}