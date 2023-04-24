import { useEffect, useState } from "react";
import axios from "axios";
import css from "./RecentMatches.module.css";

interface RecentMatchesProps {
  matches?: any;
}

const RecentMatches = ({ matches }: RecentMatchesProps) => {
  return (
    <>
      <h3 className={css.title}>Recent games</h3>
      <div className={css.recentMatches}>
        {matches ? (
          matches.map((match: any) => (
            <div className={css.match}>
              <div className={css.winner}>
                {match?.player1 === match?.winner
                  ? match?.player1
                  : match?.player2}
              </div>
              <div>vs</div>
              <div className={css.loser}>
                {match?.player1 === match?.winner
                  ? match?.player2
                  : match?.player1}{" "}
              </div>{" "}
            </div>
          ))
        ) : (
          <span>No matches to show</span>
        )}
      </div>
    </>
  );
};

export default RecentMatches;
