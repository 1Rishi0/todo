import React, {useRef} from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = ()=>{

    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    
    const navigate = useNavigate();

    const handleSignUp = async()=>{
        const username = nameRef.current.value;
        const password = passwordRef.current.value;
        try{
            const response = await axios.post("http://localhost:4000/register", {name: username, password: password});
            console.log("User registered successfully");
        }
        catch(error){
            console.error("Error resgistering user: ",error);
        }
    };

    const handleLogin = ()=>{
        navigate("/");
    };

    return(
        <div id="logincard"  className="logincard" align="center">
            <h1>SIGN UP</h1>
            <div id="inputs" className="inputs">
                <input placeholder="Name" className="nameInput" ref={nameRef}/>
                <input type="email" placeholder="Email" className="emailInput" />
                <input placeholder="Password" className="passwordInput" ref={passwordRef}/>
            </div>
            <div className="buttons">
                <button className="login" onClick={handleLogin}>LOGIN</button>
                <button className="signup" onClick={handleSignUp}>SIGN UP</button>
            </div>
        </div>
    )

}

export {SignUp};