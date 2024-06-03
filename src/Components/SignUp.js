import React from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = ()=>{
    const navigate = useNavigate();

    function handleSignup(){
        console.log("Login clicked");
    }

    const handleLogin = ()=>{
        navigate("/");

    }

    return(
        <div id="logincard"  className="logincard" align="center">
            <h1>SIGN UP</h1>
            <div id="inputs" className="inputs">
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
            </div>
            <div className="buttons">
                <button className="login" onClick={handleLogin}>LOGIN</button>
                <button className="signup">SIGN UP</button>
            </div>
        </div>
    )

}

export {SignUp};