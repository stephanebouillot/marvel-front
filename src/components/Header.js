import React from "react";
import logo from "../img/logomarvel.png";

import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <div className="header">
        <div className="menu">
          <Link to="/">
            <img src={logo} alt="logo Marvel" />
          </Link>

          <div>
            <Link to="/">Personnages</Link>
          </div>
          <div>
            <Link to="/comics">Comics</Link>
          </div>

          {props.loggedIn ? (
            <div>
              <Link to="/favoris">Favoris</Link>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="inscriptionconnexion">
          {props.loggedIn ? (
            <div className="deconnexion" onClick={props.onLogOut}>
              Deconnexion
            </div>
          ) : (
            <>
              <div className="connexion">
                <Link to="/signup">Signup</Link>
              </div>

              <div className="connexion">
                <Link to="/logIn">Connexion</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="formline" />
    </>
  );
};

export default Header;
