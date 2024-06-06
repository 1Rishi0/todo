import React, { useState } from "react";
import "./Login.css";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setUser } from "./loginReducer";


const Login = ()=>{
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();

   
    const handleLogin = async ()=>{
        try{
            if (!name || !password) {
                toast.error("Please enter both username and password.");
                return;
            }
            const response = await axios.get("http://localhost:4000/users");
            console.log(response);
            const user = response.data.find((userData)=>userData.name === name && userData.password === password )
            if(response.status === 200 && user){
            console.log("Login successfull");
            dispatch(setUser(user));
            toast.success("Logging in...");
            setTimeout(() => {
                navigate("/home", { state: { username: name } });
            }, 2000); // Redirect after 2 seconds
            }
            else{
                console.error("Login failed");
                toast.error("Invalid credentials. Please check your username and password.");
            }
        }
        catch(error){
            console.error("Error logging in: ",error);
            toast.error("An error occurred while logging in. Please try again later.");
        }
    };

    const handleSignUp = ()=>{
        navigate("/signup");

    }

    return(
        <div>
         <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

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
        </div>
        
    )
}

export default Login;