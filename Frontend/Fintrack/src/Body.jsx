import React,{useState} from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";
import {Route,Routes} from "react-router-dom";
import Launchpage from "./Launchpage";
const Body=()=>{
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    return(<React.Fragment>
        <Routes>
            {!isAuthenticated?(
                <>
                    <Route path="/" element={<Launchpage/>}></Route>
                    <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated}/>}></Route>
                    <Route path="/signup" element={<Signup/>}></Route>
                </>
            ):(
                <>
                    
                    <Route path="/home/*" element={<Home/>}></Route>
                </>
            )}
        </Routes>
    </React.Fragment>);
}
export default Body;