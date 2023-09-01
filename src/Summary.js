import Stat from "./Stat";
function Summary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = Math.round(average(watched.map((movie) => movie.runtime)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <Stat emoji={"#️⃣"} stat={watched.length} />
        <Stat emoji={"⭐️"} stat={avgImdbRating?.toFixed(1)} />
        <Stat emoji={"🌟"} stat={avgUserRating?.toFixed(1)} />
        <Stat emoji={"⏳"} stat={`${avgRuntime} min`} />
      </div>
    </div>
  );
}

export default Summary;
