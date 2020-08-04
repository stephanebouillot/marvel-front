import React, { useState } from "react";

const SearchCharacter = (props) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div>
        <form
          // className="formcontent"
          onSubmit={async (event) => {
            event.preventDefault();
            props.onSearch(search);
          }}
        >
          <div className="blocrecherche">
            <input
              className="input"
              type="string"
              placeholder="Cherchez un personnage"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            ></input>
            <button className="button-search" type="submit">
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchCharacter;
