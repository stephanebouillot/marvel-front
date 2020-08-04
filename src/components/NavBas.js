import React from "react";

function NavBas(props) {
  let pages = [];

  for (let i = 1; i <= props.pages; i++) {
    pages.push(i);
  }

  return (
    <>
      <ul className="choixpages">
        <li
          className="chevron"
          onClick={() => {
            if (props.page > 1) {
              props.changePage(props.page - 1);
            }
          }}
        >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </li>
        {pages
          .slice(
            Math.max(0, props.page - 5),
            Math.min(props.pages, props.page + 4)
          )
          .map((page) => (
            <li
              className={`button-pages ${
                page === props.page ? "button-current-page" : ""
              }`}
              key={`page-${page}`}
              onClick={() => {
                props.changePage(page);
              }}
            >
              {page}
            </li>
          ))}
        <li className="chevron">
          <i
            class="fa fa-chevron-right"
            aria-hidden="true"
            onClick={() => {
              if (props.page < props.pages) {
                props.changePage(props.page + 1);
              }
            }}
          ></i>
        </li>
      </ul>
    </>
  );
}

export default NavBas;
