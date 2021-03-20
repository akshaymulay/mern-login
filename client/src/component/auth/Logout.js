import React,{useContext} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
function Logout() {
	const {getLoggedIn}=useContext(AuthContext);
	const history=useHistory();
	async function logout(){
		await axios.get("http://localhost:3001/auth/logout");
		await getLoggedIn();
		history.push("/");
	}
  return (
  <button onClick={logout}>
  Log out
  </button>
  );
}

export default Logout;
