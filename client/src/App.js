import React from "react";
import axios from "axios";
import Router from "./router";
import {AuthContextProvider} from "./context/AuthContext";
axios.defaults.withCredentials=true;
function App() {
  return (
  <AuthContextProvider>
    <Router/>
    </AuthContextProvider>
  );
}

export default App;
