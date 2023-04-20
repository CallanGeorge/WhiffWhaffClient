import { useEffect, useState } from "react";
import axios from "axios";
import css from "./RecentMatches.module.css";

const RecentMatches = () => {
  const [matches, setMatches] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/all-matches?page=0&size=5`)
      .then((response) => {
        console.log(response.data.content);
        setMatches(response.data.content);
      });
  }, []);
  return (
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
  );
};

export default RecentMatches;
