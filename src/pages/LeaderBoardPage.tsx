import { useState, useEffect } from "react";
import axios from "axios";

import css from "./leaderBoardPage.module.css";
import { Link } from "react-router-dom";

export const LeaderBoardPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users")
      .then((response) => {
        setData(response.data.content);
        console.log(response);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <>
      <Link to="/home" className={css.back}>
        Back Home
      </Link>
      <main className={css.main}>
        <h1>LeaderBoard</h1>
        <div className={css.leaderboard}>
          {data ? (
            data.map((d: any) => (
              <div className={css.leaderboardUser}>
                <div>{d!.id}</div>
                <div>
                  <Link to={`/${d!.username}`}>{d!.username}</Link>
                </div>
                <div>{d!.score}</div>
              </div>
            ))
          ) : (
            <span>{error}</span>
          )}
        </div>
      </main>
    </>
  );
};

export {};
