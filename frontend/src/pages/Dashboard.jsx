import { useEffect} from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState } from "react";
import axios from "axios"

export const Dashboard = () => {

    const[userBalance,setUserBalance] = useState("");
    const [userName,setUserName] = useState("");


    async function fetchBalance(){
     try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance" ,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }

        });
        console.log(response);
        setUserBalance(response.data.balance.toFixed(2));
        setUserName(response.data.user);
        
        //console.log(response.data.balance);
        
     } catch (error) {
        console.log(error);
        
     }

    }

    useEffect(()=>{
        fetchBalance();
    },[])
    return <div>
        <Appbar value={userName} />
        <div className="m-8">
            <Balance value={userBalance} />
            <Users />
        </div>
    </div>
}