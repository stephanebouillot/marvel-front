import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBas from "./NavBas";

import Cookies from "js-cookie";

const Favoris = (props) => {
  // Message d attente envoyer pendamt le chargement de la requete
  const [loading, setLoading] = useState(true);
  // Declaration de variables locales
  const [favorisCharacters, setFavorisCharacters] = useState([]);
  const [favorisComics, setFavorisComics] = useState([]);
  const [countCharacters, setCountCharacters] = useState(0);
  const [countComics, setCountComics] = useState(0);
  const [pageComics, setPageComics] = useState(1);
  const [pageCharacters, setPageCharacters] = useState(1);
  // declaration de constante pour limiter l affichage des elements a 20 dans les pages
  const charactersByPage = 20;
  const comicsByPage = 20;
  // recuperation des donnees de Characteres via serveur heroku
  const fetchData = async () => {
    try {
      const responseCharacters = await axios.get(
        "https://stephanemarvel.herokuapp.com/favoris",

        {
          params: {
            // seul le type character est pris enm compte dans le get
            type: "character",

            offset: (pageCharacters - 1) * charactersByPage,
            limit: charactersByPage,
          },
          // verification des autorisations du user
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // recuperation des donnees de comics via serveur heroku
      const responseComics = await axios.get(
        "https://stephanemarvel.herokuapp.com/favoris",

        {
          params: {
            // seul le type comic est pris enm compte dans le get
            type: "comic",
            offset: (pageComics - 1) * comicsByPage,
            limit: comicsByPage,
          },
          // verification des autorisations du user
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // envoi des donnees recuperees dans les props
      setFavorisCharacters(responseCharacters.data.favoris);
      setCountCharacters(responseCharacters.data.count);

      setFavorisComics(responseComics.data.favoris);
      setCountComics(responseComics.data.count);
      setLoading(false);

      // gestion des erreurs du fetchdata
    } catch (err) {
      console.error(err);
    }
  };
  // le useEffect ici me sert a recuperer les donnees a chaque changement de page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharacters = await axios.get(
          "https://stephanemarvel.herokuapp.com/favoris",
          {
            params: {
              type: "character",
              offset: (pageCharacters - 1) * charactersByPage,
              limit: charactersByPage,
            },
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        const responseComics = await axios.get(
          "https://stephanemarvel.herokuapp.com/favoris",
          {
            params: {
              type: "comic",
              offset: (pageComics - 1) * comicsByPage,
              limit: comicsByPage,
            },
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        setFavorisCharacters(responseCharacters.data.favoris);
        setCountCharacters(responseCharacters.data.count);

        setFavorisComics(responseComics.data.favoris);
        setCountComics(responseComics.data.count);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [pageComics, pageCharacters]);

  // variable pour detruire un favoris envoyes et gere par le back
  const deletefavoris = async (type, id) => {
    try {
      await axios.delete(`https://stephanemarvel.herokuapp.com/favoris`, {
        headers: {
          // verification des autorisations du user
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        // suppression du favoris correspondant au type et a l id
        data: {
          type: type,
          id: id,
        },
      });
    } catch (err) {
      if (err.response.data.error) {
        alert(err.response.data.error.message);
      } else {
        alert("Error");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // on retourne les donnees des gets axios
    <>
      <div className="contentfavoris">
        <div className="titrefavoris">
          <div>
            Characteres favoris
            <ul>
              {/* boucle sur les donnes recus dans le back et demande par la requete responseCharacters*/}
              {favorisCharacters.map((character) => (
                <li>
                  {/* ici le boutton appele la fonction deletefavoris en lui donnant comme arguments le type et l id du favori */}
                  <button
                    onClick={async () => {
                      await deletefavoris("character", character.id);
                      // le fechdata rafraichit la page avec les useState
                      fetchData();
                    }}
                  >
                    Delete
                  </button>

                  {/* les props recoivent les donnees envoyees par axios get */}
                  <div className="colonne">
                    <div className="namefavoris">{character.name}</div>

                    <img
                      alt={character.name}
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    ></img>
                  </div>
                </li>
              ))}
            </ul>
            {/* navigation entre les pages */}
            <NavBas
              page={pageCharacters}
              // operation mathematique : le nombre de carateres divise par 20 et changement de page apres 20 donnees la fonction ceil envoie au nombre au dessus ce qui permet de creer une page avec 2 donees
              pages={Math.ceil(countCharacters / charactersByPage)}
              // callback pour changer la page depuis navbas.js
              changePage={setPageCharacters}
            />
          </div>
          <div>
            Comics favoris
            <ul>
              {favorisComics.map((comic) => (
                <li>
                  <button
                    onClick={async () => {
                      await deletefavoris("comic", comic.id);
                      fetchData();
                    }}
                  >
                    Delete
                  </button>
                  <div className="colonne">
                    <div className="namefavoris">{comic.title}</div>

                    <img
                      alt={comic.title}
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    ></img>
                  </div>
                </li>
              ))}
            </ul>
            <NavBas
              page={pageComics}
              pages={Math.ceil(countComics / comicsByPage)}
              changePage={setPageComics}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Favoris;
