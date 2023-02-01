import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate;
  const [familia, setFamilia] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState(0);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: "hola",
      password: "1234",
    });

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://3001-4geeksacade-reactflaskh-mxiz00uc9dt.ws-eu77.gitpod.io/api/private",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.correcto) {
          navigate("/");
        }
      })
      .catch((error) => console.log("error", error));

    fetch(
      "https://3001-javim552-authentication-iumv2o9nxiv.ws-eu84.gitpod.io/api/family"
    )
      .then((response) => response.json())
      .then((result) => setFamilia(result))
      .catch((error) => console.log("error", error));

    // >>>>>>>>>>>>>>>>>>>>>>> fetch agregar <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // ------------------------------------------------------------------------
  }, []);
  const Agregar = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      apellidos: apellidos,
      edad: edad,
      nombre: nombre,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://3001-javim552-authentication-iumv2o9nxiv.ws-eu84.gitpod.io/api/family",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload(true);
  };

  return (
    <>
      <div className="mt-3 btn-group" style={{ marginLeft: "15px" }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Agregar
        </button>
        <ul className="dropdown-menu">
          <li>
            <p className="dropdown-item" href="#">
              Nombre :{" "}
              <input
                className="form-control mb-1 border"
                placeholder="Name"
                onChange={(event) => setNombre(event.target.value)}
              ></input>
            </p>
          </li>
          <li>
            <p className="dropdown-item" href="#">
              Apellidos :{" "}
              <input
                className="form-control mb-1 border"
                placeholder="Surname"
                onChange={(event) => setApellidos(event.target.value)}
              ></input>
            </p>
          </li>
          <li>
            <p className="dropdown-item" href="#">
              Edad :{" "}
              <input
                className="form-control mb-1 border"
                placeholder="Edad"
                onChange={(event) => setEdad(event.target.value)}
              ></input>
            </p>
          </li>
          <li>
            <button
              type="button"
              onClick={Agregar}
              className="btn btn-primary btn-lg"
            >
              Enviar
            </button>
          </li>
        </ul>
      </div>
      <table className="table" style={{ color: "blue", marginTop: "30px" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Edad</th>
          </tr>
        </thead>
        <tbody>
          {familia.map((element, index) => (
            <tr>
              {element.edad != 0 ? (
                <>
                  <th scope="row">{index + 1}</th>
                  <td>{element.nombre}</td>
                  <td>{element.apellidos}</td>
                  <td>{element.edad}</td>
                </>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
