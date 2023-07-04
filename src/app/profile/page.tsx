"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();

    const[userData,setUserData] = useState("nothing");


    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout successful");
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setUserData(res.data.data._id)
    }

    const sendResetEmail = async () => {
        const res = await axios.post('/api/users/sendresetemail')
        console.log(res.data);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />  
            <p>Profile Page</p>

            <h2 className="padding rounded bg-green-500 p-3 m-3">{userData === 'nothing' ? "nothing" : <Link href={`/profile/${userData}`}>{userData}</Link>}</h2>

            <hr/>

            <div>
                <button 
                    className="my-4 mx-2 px-4 py-1 border border:white rounded text-black bg-white font-bold"
                    onClick={sendResetEmail}>Change Pass?
                </button>

                <button 
                onClick={logout}
                className="my-4 px-4 py-1  rounded text-white bg-red-500 font-bold">Logout
                </button>
            </div>
           

            <button 
            onClick={getUserDetails}
            className="px-4 py-1 rounded text-black bg-amber-400 font-bold">Get User Details
            </button>
            
        </div>
    )
}