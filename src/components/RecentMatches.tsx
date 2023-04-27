import { useEffect, useState } from "react";
import axios from "axios";
import css from "./RecentMatches.module.css";

interface RecentMatchesProps {
  matches?: any;
}

const RecentMatches = ({ matches }: RecentMatchesProps) => {
  console.log(matches);
  return (
    <>
      <h2 className={css.title}>Recent games</h2>
      <div className={css.recentMatches}>
        {matches ? (
          matches.map((match: any, i: any) => (
            <div className={css.match} key={i}>
              <div
                className={
                  match?.player1 === match?.winner ? css.winner : css.loser
                }
              >
                {match?.player1}
              </div>
              <div className={css.versus}>vs</div>
              <div
                className={
                  match?.player1 === match?.winner ? css.loser : css.winner
                }
              >
                {match?.player2}{" "}
              </div>
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
