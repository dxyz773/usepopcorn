import Stat from "./Stat";
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <Stat emoji={"⭐️"} stat={movie?.imdbRating?.toFixed(1)} />
        <Stat emoji={"🌟"} stat={movie?.userRating?.toFixed(1)} />
        <Stat emoji={"⏳"} stat={`${movie.runtime} min`} />
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
