import axios from "axios";
import React,{useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function Login() {
	const[email,setEmail]=useState("");
	const[password,setPassword]=useState("");
	const{getLoggedIn}=useContext(AuthContext);
	const history=useHistory();

	async function login(e){
		e.preventDefault();
		try{
			const loginData={

				email,
				password,
			};

			await axios.post("http://localhost:3001/auth/login",loginData);
			await getLoggedIn();
			history.push("/");
		}
		catch(err){
			console.log(err);

		}
	}
  return (
  <div>
    <h1>Login to your Account</h1>
    <form onSubmit={login}>
    <input type="email" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
    <input type="password" placeholder="Enter Your password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
    <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;
