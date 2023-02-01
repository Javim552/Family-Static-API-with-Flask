import React, {useState }from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const SignupApp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log ("datos", password, email)
  const registro = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password,
      is_active: false
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://3001-javim552-authentication-iumv2o9nxiv.ws-eu84.gitpod.io/api/signup",
      requestOptions
    )
      .then((response) => response.json())
      .then(result => {
        if(result.message) navigate("/")
      })
      .catch((error) => console.log("error", error));
  };

  return(
    <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registro</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input className="form-control mb-3 border" placeholder="Email" onChange={(event) => setEmail(event.target.value)}></input>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input className="form-control mb-3 border" placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)}></input>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={registro} className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://tse2.mm.bing.net/th?id=OIP.loU5VLcllgYk2YGoGhwd8AHaHa&pid=Api"
                  className="img-fluid" alt="Sample image" style={{marginLeft: "90px"}}/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
   );
};
