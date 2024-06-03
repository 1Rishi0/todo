import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const navigate = useNavigate();
    function handleLogin(){
        console.log("Login clicked");
    }

    const handleSignUp = ()=>{
        navigate("/signup");

    }

    return(
        <div id="logincard"  className="logincard" align="center">
            <h1>LOGIN</h1>
            <div id="inputs" className="inputs">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
            </div>
            <div className="buttons">
                <button className="login" onClick={handleLogin}>LOGIN</button>
                <button className="signup" onClick={handleSignUp}>SIGN UP</button>
            </div>
        </div>
    )

}

export default Login;