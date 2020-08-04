import React, { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";

const Favoris = (props) => {
  const [loading, setLoading] = useState(true);

  const [favorisCharacters, setFavorisCharacters] = useState([]);
  const [favorisComics, setFavorisComics] = useState([]);
  // const [countCharacters, setCountCharacters] = useState(0);
  // const [countComics, setCountComics] = useState(0);
  // const [page, setPage] = useState(1);
  const page = 1;
  const charactersByPage = 20;
  const comicsByPage = 20;

  const fetchData = async () => {
    try {
      const responseCharacters = await axios.get(
        "https://stephanemarvel.herokuapp.com/favoris",

        {
          params: {
            type: "character",
            offset: (page - 1) * charactersByPage,
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
            offset: (page - 1) * comicsByPage,
            limit: comicsByPage,
          },
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setFavorisCharacters(responseCharacters.data.favoris);
      // setCountCharacters(responseCharacters.data.count);

      setFavorisComics(responseComics.data.favoris);
      // setCountComics(responseComics.data.count);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharacters = await axios.get(
          "https://stephanemarvel.herokuapp.com/favoris",

          {
            params: {
              type: "character",
              offset: (page - 1) * charactersByPage,
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
              offset: (page - 1) * comicsByPage,
              limit: comicsByPage,
            },
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        setFavorisCharacters(responseCharacters.data.favoris);
        // setCountCharacters(responseCharacters.data.count);

        setFavorisComics(responseComics.data.favoris);
        // setCountComics(responseComics.data.count);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const deletefavoris = async (type, id) => {
    try {
      await axios.delete(`https://stephanemarvel.herokuapp.com/favoris`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        data: {
          type: type,
          id: id,
        },
      });
    } catch (err) {
      console.error("Error");
    }
  };

  // const changePage = async (newPage) => {
  //   setPage(newPage);
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(favorisCharacters);

  return (
    <>
      <div className="contentfavoris">
        <div className="titrefavoris">
          <div>
            Characteres favoris
            <ul>
              {favorisCharacters.map((character) => (
                <li>
                  <button
                    onClick={async () => {
                      await deletefavoris("character", character.id);
                      fetchData();
                    }}
                  >
                    Delete
                  </button>
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
          </div>
        </div>
      </div>
      {/* <NavBas
        page={page}
        pages={Math.ceil(countComics / comicsByPage)}
        pages={Math.ceil(countCharacters / charactersByPage)}
        changePage={changePage}
      /> */}
    </>
  );
};

export default Favoris;
