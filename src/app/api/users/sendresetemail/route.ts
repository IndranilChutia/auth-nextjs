import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest){
    try{
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id: userId}).select("-password");

        console.log(user)

        const userEmail = await user.email;
        console.log(userEmail,"-------")
        const userID = await user._id;

        await sendEmail({email: userEmail, emailType: "RESET", userId: userID})

        return NextResponse.json({
            message: "Reset Email Sent",
            success:true
        });
        
    } catch(error:any){
        return NextResponse.json({error: error.message},{status: 500})
    }

}