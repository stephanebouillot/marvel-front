import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

const SignUp = (props) => {
  let history = useHistory();
  const [username, setUserName] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [confirmpassword, setConfirmPassword] = useState(props.confirmpassword);

  return (
    // <div className="titresignup">Creez un compte</div>
    <div className="pageform">
      {/* formulaire */}

      <div className="formcontent">
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (password !== confirmpassword) {
              alert("Le Mot de passe est different");
            } else if (
              username === "" ||
              email === "" ||
              password === "" ||
              confirmpassword === ""
            ) {
              alert("veuillez remplir les champs vides");
            } else {
              try {
                // envoi des donnees saisis par l user vers la bdd
                const response = await axios.post(
                  "https://stephanemarvel.herokuapp.com/signUp",
                  {
                    username: username,
                    email: email,
                    password: password,
                    confirmpassword: confirmpassword,
                  }
                );
                // affichage de la page par default uen fois le formulaire d inscription valide
                history.push("/");
                // envoi des coockies
                Cookies.set("token", response.data.token);
                // passage du bouton en connecte
                props.onLogIn();
              } catch (err) {
                if (err.response.data.error) {
                  alert(err.response.data.error.message);
                } else {
                  alert("Error");
                }
              }
            }
          }}
          className="registerform"
          id="login"
          action=""
        >
          <label className="labellogin">Pseudo {props.username}</label>
          <input
            className="saisieform"
            type="text"
            value={username}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />

          <label className="labellogin">Adresse email {props.email}</label>
          <input
            className="saisieform"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <label className="labellogin">Mot de passe {props.password}</label>
          <input
            className="saisieform"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label className="labellogin">
            Confirmer le mot de passe {props.confirmpassword}
          </label>
          <input
            className="saisieform"
            type="password"
            value={confirmpassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />

          <button
            className="buttonsignupinscription"
            name="submit"
            type="submit"
          >
            Creer mon compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
