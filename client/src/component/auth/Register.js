import axios from "axios";
import React,{useContext,useState} from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function Register() {
	const[user,setUser]=useState("");
	const[email,setEmail]=useState("");
	const[phone,setPhone]=useState("");
	const[password,setPassword]=useState("");
	const[passwordVerify,setpasswordVerify]=useState("");
	const{getLoggedIn}=useContext(AuthContext);
	const history=useHistory();
	async function register(e){
		e.preventDefault();
		try{
			const registerData={
				user,
				email,
				phone,
				password,
				passwordVerify,
			};

			await axios.post("http://localhost:3001/auth/",registerData);
			await getLoggedIn();
			history.push("/");
		}
		catch(err){
			console.log(err);

		}
	}
  return (
  <div>
    <h1>Register a New Account</h1>
    <form onSubmit={register}>
    <input type="text" placeholder="Enter Your Name" onChange={(e)=>setUser(e.target.value)} value={user}/>
    <input type="email" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
    <input type="text" placeholder="Enter Your Phone Number" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
    <input type="password" placeholder="Enter Your password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
    <input type="password" placeholder="Renter your password" onChange={(e)=>setpasswordVerify(e.target.value)} value={passwordVerify}/>
    <button type="submit">Register</button>
    </form>
    </div>
  );
}

export default Register;
