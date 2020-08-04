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

  const comicsByPage = 100;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stephanemarvel.herokuapp.com/comics",
          {
            params: {
              offset: (page - 1) * comicsByPage,
              limit: comicsByPage,
              search: search === "" ? undefined : search,
            },
          }
        );

        setComics(response.data.comics);
        setCount(response.data.count);

        setLoading(false);
      } catch (err) {
        console.error("Error");
      }
    };
    fetchData();
  }, [page, search]);

  const changePage = async (newPage) => {
    setPage(newPage);
  };
  const onSearch = async (toSearch) => {
    setSearch(toSearch);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const gofavorisback = async (id) => {
    try {
      await axios.post(
        `https://stephanemarvel.herokuapp.com/favoris`,

        {
          type: "comic",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Error");
    }
  };

  return (
    <>
      {/* Affichage des tous les comics */}
      <div className="content">
        <ul className="annonces">
          <SearchCharacter onSearch={onSearch} />
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
      </div>

      <NavBas
        page={page}
        pages={Math.ceil(count / comicsByPage)}
        changePage={changePage}
      />
    </>
  );
};

export default Comics;
