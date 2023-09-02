import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        // Here the activeElement property returns the element in the DOM that is currently in focus, and here I am checking if that element is in fact the element saved in usedRef so that the call back will early return and not reset the query
        if (document.activeElement === inputEl.current) return;

        if (e.key === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);

      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
      autoFocus
    />
  );
}

export default Search;
