import React, { useState } from "react";
import "./Login.css";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const Login = ()=>{
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleLogin = async ()=>{
        try{
            const response = await axios.get("http://localhost:4000/users");

            if(response.status === 200 && response.data[0].name === name && response.data[0].password === password){
            console.log("Login successfull");
            navigate("/home");
            }
            else{
                console.error("Login failed");
            }
        }
        catch(error){
            console.error("Error logging in: ",error);
        }
    };

    const handleSignUp = ()=>{
        navigate("/signup");

    }

    return(
        <div id="logincard"  className="logincard" align="center">
            <h1>LOGIN</h1>
            <div id="inputs" className="inputs">
                <input type="text" placeholder="Username" onChange={(e)=>setName(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="buttons">
                <button className="login" onClick={handleLogin}>LOGIN</button>
                <button className="signup" onClick={handleSignUp}>SIGN UP</button>
            </div>
        </div>
    )

}

export default Login;