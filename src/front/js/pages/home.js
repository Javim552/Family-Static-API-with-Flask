import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate ()
  const [email , setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [error, setError] = useState ("")

  const Login = () => {

    console.log ( email, password)
    var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2OTY0ODM2NywianRpIjoiZGY2YTkxOTItMjNjOS00YzQ1LWIzMDItNDZhODljNDVlOGM2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjY5NjQ4MzY3LCJleHAiOjE2Njk2NDkyNjd9.XvK0v8tj_T0z8QO_JGG1VO9MzBKkPqwG7SVxgzeMLZ4");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": email,
  "password": password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://3001-4geeksacade-reactflaskh-mxiz00uc9dt.ws-eu77.gitpod.io/api/login", requestOptions)
  .then(response => response.json())
  .then((result) => {
  if (result.token){  
  localStorage.setItem ("token",result.token)
  navigate ("/demo")
  }else{
      setError(result.msg)
  }  
})
  .catch(error => console.log('error', error));
  }

  return (
    <div className="text-center mt-5">
      <h1>VAMOS A ENTRAR</h1>

      <div>
        <lavel>E-mail: </lavel>
        <input onChange={(event) => setEmail(event.target.value)}></input>
        <label className = "m-2">Contraseña: </label>
        <input onChange ={(event) => setPassword(event.target.value)}></input>
      </div>
      
      <div>
      <button onClick={Login}>Login</button>
      {error && <div class="alert alert-danger" role="alert">{error}</div>}
      </div>
    </div>
  );
};
