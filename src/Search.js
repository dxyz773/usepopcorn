import { useRef } from "react";
import { useKey } from "./useKey";
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  // Custom Hook
  useKey("keydown", "Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

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
