import { useEffect, useState } from "react";
import StarRating from "./StarRating";

function MovieDetails({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
  apiKey,
}) {
  const [detailedMovie, setDetailedMovie] = useState({});
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = detailedMovie;

  const watchedMovie = watched.filter((w) => w.imdbID === selectedID);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedID}`
      );

      const data = await res.json();
      setDetailedMovie(data);
    }
    getMovieDetails();
  }, [selectedID, apiKey]);

  function handleRating(rating) {
    setUserRating(rating);
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {watchedMovie.length > 0 ? (
            <p>You rated this movie</p>
          ) : (
            <>
              <StarRating
                size={24}
                maxRating={10}
                onSetRating={handleRating}
                key={selectedID}
              />
              {userRating && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

export default MovieDetails;
