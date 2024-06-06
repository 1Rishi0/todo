import React, {useRef} from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ()=>{

    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);

    const navigate = useNavigate();

    const handleSignUp = async()=>{
        const username = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            // Display a toast message to enter both username and password
            toast.error("Please enter both username and password.");
            return;
        }

        try{
            const response = await axios.post("http://localhost:4000/register", {name: username, email: email, password: password});
            console.log("User registered successfully");
            toast.success("Signing up...");
            setTimeout(() => {
                navigate("/home", { state: { username: username } });
            }, 2000); // Redirect after 2 seconds
        }
        catch(error){
            console.error("Error resgistering user: ",error);
            toast.error("Error registering user. Please try again later.");
        }
    };

    const handleLogin = ()=>{
        navigate("/");
    };

    return(
        <div>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        <div id="logincard"  className="logincard" align="center">
            <h1>SIGN UP</h1>
            <div id="inputs" className="inputs">
                <input placeholder="Name" className="nameInput" ref={nameRef}/>
                <input type="email" placeholder="Email" className="nameInput" ref={emailRef}/>
                <input placeholder="Password" className="passwordInput" ref={passwordRef}/>
            </div>
            <div className="buttons">
                <button className="login" onClick={handleLogin}>LOGIN</button>
                <button className="signup" onClick={handleSignUp}>SIGN UP</button>
            </div>
        </div>
        </div>
    )

}

export {SignUp};