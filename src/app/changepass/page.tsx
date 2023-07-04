"use client";

import axios from "axios";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

export default function ChangePassPage(){

    const router = useRouter();

    const [token, setToken] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState(false);

    const [passMatch, setPassMatch] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const changeUserPass = async () => {
        try {
            setLoading(true);

            await axios.post('/api/users/changepass',{token, newPass})
            router.push("/login");
        } catch (error:any) {
            setError(true);
            console.log("Error: ", error?.response.data);
        
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        if(newPass === confirmPass && newPass.length >= 4 && confirmPass.length >= 4){
            setPassMatch(true);
        } else {
            setPassMatch(false);
        }
    },[newPass, confirmPass])


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2 className="p-2 bg-orange-500 text-black my-4"> {token ? `${token}` : "No Token"}</h2>
            <h1 className="text-4xl font-bold my-4">{loading ? "Processing" : "Change Password"}</h1>
            <hr />
            
            {!passMatch && (
            <div className="p-2 m-2 border-2 border-red-600 rounded-lg">
                <h3 className="text-red-600 font-bold">The Passwords do not Match or Length is less than 4!</h3>
            </div>)}

                <label htmlFor="newPassword">New Password</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="text" 
                    id="newPassword"
                    placeholder="New Password"
                    value={newPass}
                    onChange={(e)=> setNewPass(e.target.value)}/>

                <label htmlFor="confirmPass">Confirm Password</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="password" 
                    id="confirmPass"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e)=> setConfirmPass(e.target.value)}/>

            

            <button className={`py-3 px-4 rounded-lg font-medium bg-green-600 text-white ${passMatch? "bg-green-600":" disabled:opacity-40"}`} 
            disabled={!(passMatch)}
            onClick={()=>{changeUserPass()}}
            >Change Password</button>

            {error && (
            <div id="inner">
                <h2 className="my-3 rounded-lg p-2 bg-red-500 text-black">Error</h2>
            </div>
            )}
        </div>

        
    )


}