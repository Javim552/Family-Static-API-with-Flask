import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const LoginApp = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Login = () => {
    console.log(email, password);
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2OTY0ODM2NywianRpIjoiZGY2YTkxOTItMjNjOS00YzQ1LWIzMDItNDZhODljNDVlOGM2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjY5NjQ4MzY3LCJleHAiOjE2Njk2NDkyNjd9.XvK0v8tj_T0z8QO_JGG1VO9MzBKkPqwG7SVxgzeMLZ4");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://3001-javim552-authentication-iumv2o9nxiv.ws-eu84.gitpod.io/api/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          navigate("/demo");
        } else {
          setError(result.msg);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {/* -----------------------  NUEVO LOGIN ------------------------------------------------ */}
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log-In
                      </p>

                      <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              className="form-control mb-3 border"
                              placeholder="Email"
                              onChange={(event) => setEmail(event.target.value)}
                            ></input>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              className="form-control mb-3 border"
                              placeholder="Password"
                              type="password"
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            onClick={Login}
                            className="btn btn-primary btn-lg"
                          >
                            ENTRAR
                          </button>

                          <Link
                            className="btn btn-primary btn-lg"
                            type="button"
                            to={"/signup"}
                            style={{ marginLeft: "10px" }}
                          >
                            REGISTRO
                          </Link>
                        </div>
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
