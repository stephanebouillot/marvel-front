import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

import Cookies from "js-cookie";

const LogIn = (props) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="pageform">
        <form
          className="formcontent"
          id="login"
          onSubmit={async (event) => {
            event.preventDefault();

            if (email === "" || password === "") {
              alert("Veulliez remplir tout les champs");
            }

            try {
              const response = await axios.post(
                "https://stephanemarvel.herokuapp.com/connexion",
                {
                  email: email,
                  password: password,
                }
              );
              history.push("/");
              Cookies.set("token", response.data.token);
              props.onLogIn();
            } catch (err) {
              if (err.response.data.error) {
                alert(err.response.data.error.message);
              } else {
                alert("Error");
              }
            }
          }}
        >
          <label className="labellogin">Adresse email</label>
          <input
            className="saisieform"
            placeholder=""
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label className="labellogin">Mot de passe</label>
          <input
            className="saisieform"
            placeholder=""
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button
            className="buttonlogin"
            name="submit"
            type="submit"
            data-submit="...Sending"
          >
            Se connecter
          </button>

          <div className="formlinebas" />

          <div className="labellogincrea">Vous n'avez pas de compte ?</div>

          <button
            className="buttonsignup"
            name="submit"
            onClick={() => {
              history.push("/signup");
            }}
          >
            Creer un compte
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
