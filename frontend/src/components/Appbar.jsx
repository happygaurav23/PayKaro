import { useNavigate } from "react-router-dom";
import { Button } from "./Button"

/* eslint-disable react/prop-types */
export const Appbar = ({value}) => {

    const navigate = useNavigate();


    function handleLogOff(){
        localStorage.removeItem("token");
        navigate('/')
    }
    return <div className="shadow h-14 flex justify-between">
        <div className="flex text-3xl font-semibold flex-col justify-center h-full ml-4">
            PayKaro
        </div>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello,
            </div>
            <div className="rounded-3xl h-12 w-full bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {value}
                </div>
            </div>
            <div className="flex justify-center mt-2">
            <Button label={"SignOut"} onClick={handleLogOff}>
                SignOut
            </Button>
                
            </div>
          
           
        </div>
    </div>
}