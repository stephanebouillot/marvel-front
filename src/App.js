import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Characters from "./components/Characters";
import Character from "./components/Character";
import Comics from "./components/Comics";
import Favoris from "./components/Favoris";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Cookies from "js-cookie";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header
          loggedIn={loggedIn}
          onLogOut={() => {
            Cookies.remove("token");
            setLoggedIn(false);
          }}
        />

        <main>
          <Switch>
            <Route path="/" exact>
              <Characters loggedIn={loggedIn} />
            </Route>

            <Route path="/character/:id">
              <Character />
            </Route>

            <Route path="/comics">
              <Comics loggedIn={loggedIn} />
            </Route>

            <Route path="/favoris">
              <Favoris />
            </Route>
            <Route path="/logIn">
              <LogIn
                onLogIn={() => {
                  setLoggedIn(true);
                }}
              />
            </Route>

            <Route path="/signUp">
              <SignUp
                onLogIn={() => {
                  setLoggedIn(true);
                }}
              />
            </Route>

            <Route path="/">
              <div>404</div>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
