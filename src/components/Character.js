import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBas from "./NavBas";

import axios from "axios";

const Character = (props) => {
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState({});
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const charactersByPage = 10;

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stephanemarvel.herokuapp.com/characters/${id}`,

          {
            params: {
              offset: (page - 1) * charactersByPage,
              limit: charactersByPage,
            },
          }
        );
        setCharacter(response.data);
        setCount(response.data.count);

        setLoading(false);
      } catch (err) {
        console.error("Error");
      }
    };

    fetchData();
  }, [id, page]);

  const changePage = async (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // affichage du personnage
    <>
      <div className="content">
        <div className="detailzoom">
          <img
            alt={character.name}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          ></img>
          <div className="infos">
            <div className="title">{character.name}</div>
          </div>
          <span className="titredescription">Description</span>
          <div className="description">{character.description}</div>
        </div>

        {/* afficHAGE DES comics lies au personnage  */}

        <div classname="comics">Comics lies au personnage</div>
        <ul className="listecomics">
          {character.comics.map((comic) => (
            <li className="annonce">
              <img
                alt={comic.name}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              ></img>

              <div className="infos">
                <div>
                  <div className="title">{comic.title}</div>
                </div>
              </div>
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

export default Character;
