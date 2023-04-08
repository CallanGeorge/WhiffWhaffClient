import css from "./Leaderboard.module.css";

const Leaderboard = () => {
  return (
    <div className={css.leaderboard}>
      <div className={css.leaderboardUser}>
        <div>Pic</div>
        <div>Callan George</div>
        <div>100</div>
      </div>
      <div className={css.leaderboardUser}>
        <div>Pic</div>
        <div>Callan George</div>
        <div>100</div>
      </div>
      <div className={css.leaderboardUser}>
        <div>Pic</div>
        <div>Callan George</div>
        <div>100</div>
      </div>
    </div>
  );
};

export default Leaderboard;
