import { signOut } from "firebase/auth";
import React from "react";
import { database } from './FirebaseConfig';
import { useNavigate } from "react-router-dom";
import LeftSidebar from "./Task2/LeftSidebar"
function HomeScreen(){
    const history = useNavigate()

    const handleClick = () =>{
        signOut(database).then(val=>{
            console.log(val,"val")
            history('/')
        })
    }
    return(
        <div>
          <LeftSidebar/>
            <button onClick={handleClick}>SignOut</button>
        </div>
    )
}
export default HomeScreen;