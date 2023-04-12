import { useState, useEffect } from "react";
import axios from "axios";

import css from "./leaderBoardPage.module.css";

export const LeaderBoardPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/users").then((response) => {
      setData(response.data.content);
      console.log(response);
    });
  }, []);

  return (
    <main className={css.main}>
      <h1>LeaderBoard</h1>
      <div className={css.leaderboard}>
        {data.map((d: any) => (
          <div className={css.leaderboardUser}>
            <div>{d!.id}</div>
            <div>{d!.username}</div>
            <div>100</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export {};
