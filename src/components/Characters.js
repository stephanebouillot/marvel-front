import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import NavBas from "./NavBas";

import axios from "axios";
import SearchCharacter from "./SearchCharacter";

import Cookies from "js-cookie";

const Characters = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const charactersByPage = 100;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stephanemarvel.herokuapp.com/characters",

          {
            params: {
              offset: (page - 1) * charactersByPage,
              limit: charactersByPage,
              search: search === "" ? undefined : search,
            },
          }
        );

        setCharacters(response.data.characters);
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
          type: "character",
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
      <div className="content">
        <ul className="annonces">
          <SearchCharacter onSearch={onSearch} />
          {characters.map((character) => (
            <li className="annonce">
              <img
                alt={character.name}
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                onClick={() => {
                  history.push(`/character/${character.id}`);
                }}
              ></img>

              {character.description === "" ? (
                <div className="big-infos">
                  <div className="big-title">{character.name}</div>
                </div>
              ) : (
                <div className="infos">
                  <div className="title">
                    {character.name}
                    {props.loggedIn ? (
                      <div
                        className="favoris"
                        onClick={() => {
                          gofavorisback(character.id);
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

                  <div className="description">{character.description} </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <NavBas
        page={page}
        pages={Math.ceil(count / charactersByPage)}
        changePage={changePage}
      />
    </>
  );
};

export default Characters;
