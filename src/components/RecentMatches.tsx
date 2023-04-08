import css from "./RecentMatches.module.css";

const RecentMatches = () => {
  return (
    <div className={css.recentMatches}>
      <div className={css.match}>
        <div className={css.winner}>Callan</div>
        <div>vs</div>
        <div className={css.loser}>Frankie</div>
      </div>
    </div>
  );
};

export default RecentMatches;
