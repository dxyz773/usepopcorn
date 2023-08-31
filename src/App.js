import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import { tempWatchedData } from "./Data";
import Box from "./Box";
import MovieList from "./MovieList";
import Summary from "./Summary";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import WatchedMovieList from "./WatchedMovieList";
import MovieDetails from "./MovieDetails";

const KEY = "f7058c15";

export default function App() {
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /*
  useEffect(() => {
    console.log("After initial render");
  }, []);
  useEffect(() => {
    console.log("After every render");
  });
  useEffect(() => {
    console.log("sychronized with query dependency");
  }, [query]);

  console.log("During render");
*/
  function handleSelectedMovie(imdbID) {
    setSelectedID(imdbID);
  }

  function handleClose() {
    setSelectedID(null);
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails selectedID={selectedID} onCloseMovie={handleClose} />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
