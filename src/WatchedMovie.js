import Stat from "./Stat";
function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <Stat emoji={"⭐️"} stat={movie.imdbRating} />
        <Stat emoji={"🌟"} stat={movie.userRating} />
        <Stat emoji={"⏳"} stat={`${movie.runtime} min`} />
      </div>
    </li>
  );
}

export default WatchedMovie;
