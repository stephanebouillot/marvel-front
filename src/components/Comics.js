import React, { useState, useEffect } from "react";

import SearchCharacter from "./SearchCharacter";

import NavBas from "./NavBas";
import Cookies from "js-cookie";
import axios from "axios";

const Comics = (props) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // affichage limite a 100 comic par page
  const comicsByPage = 100;

  // le useeefect est utlilise pour eviter un rafraichissmemnt de la page a chaque requete
  useEffect(() => {
    const fetchData = async () => {
      try {
        // requete a la bdd pour afficher les comics demandes , cette requete est lie au fichier comics.js de la bdd
        const response = await axios.get(
          "https://stephanemarvel.herokuapp.com/comics",
          {
            params: {
              offset: (page - 1) * comicsByPage,
              limit: comicsByPage,
              // ternaire : si champs de recherche vide alors undifined sinon appel a la props search declare dans le fichier SearchCharacter
              search: search === "" ? undefined : search,
            },
          }
        );
        // envoi de la reponse dans la page comics.js
        setComics(response.data.comics);
        setCount(response.data.count);

        setLoading(false);
      } catch (err) {
        console.error("Error");
      }
    };
    fetchData();
  }, [page, search]);

  // constante pour le changement de pages
  const changePage = async (newPage) => {
    setPage(newPage);
  };

  // constante pour le bouton onSearch
  const onSearch = async (toSearch) => {
    setSearch(toSearch);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // variable pour  ajout d un favori
  const gofavorisback = async (id) => {
    try {
      // envoi des resultats dans la page favoris des comics cliques
      await axios.post(
        `https://stephanemarvel.herokuapp.com/favoris`,

        {
          // identification des comics cliques
          type: "comic",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      alert("Added to favoris");
    } catch (err) {
      if (err.response.data.error) {
        alert(err.response.data.error.message);
      } else {
        alert("Error");
      }
    }
  };

  return (
    <>
      {/* Affichage des tous les comics */}
      <div className="content">
        <ul className="annonces">
          <SearchCharacter onSearch={onSearch} />

          {/* boucle sur comics de la bdd et envoi des infos dans la page favoris comics */}
          {comics.map((comic) => (
            <li className="annonce">
              <img
                alt={comic.title}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              ></img>

              <div className="infos">
                <div>
                  <div className="big-title-comic">
                    {comic.title}
                    {/* si user connecte emvoi du comic clique en fonction de son id  */}
                    {props.loggedIn ? (
                      <div
                        className="favoris"
                        onClick={() => {
                          gofavorisback(comic.id);
                        }}
                      >
                        <i class="fas fa-star">
                          <span>Ajouter aux favoris</span>
                        </i>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="description-comic">{comic.description} </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <NavBas
          page={page}
          pages={Math.ceil(count / comicsByPage)}
          changePage={changePage}
        />
      </div>
    </>
  );
};

export default Comics;
