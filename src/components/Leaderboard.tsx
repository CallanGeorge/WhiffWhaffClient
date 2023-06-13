import { useEffect, useState } from "react";
import axios from "axios";
import css from "./Leaderboard.module.css";
import { Link } from "react-router-dom";
import { user } from "../models/User";

const Leaderboard = () => {
  const [data, setData] = useState<user[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users?page=0&size=5", {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setData(response.data.content);
      })
      .catch((error) => setError(error.message));
  }, []);

  console.log(data);

  return (
    <>
      <h2 className={css.title}>Leaderboard</h2>
      <div className={css.leaderboard}>
        <div className={css.leaderboardHead}>
          <div>Position</div>
          <div>Name</div>
          <div>Wins</div>
        </div>
        {data ? (
          data.map((d: user, i: number) => (
            <div
              className={i + 1 === 1 ? css.king : css.leaderboardUser}
              style={{ opacity: `${100 - i * 10}%` }}
              key={i}
            >
              <div>{i + 1 === 1 ? "👑" : i + 1} </div>
              <div>
                <Link to={`/${d!.name}`}>{d!.name}</Link>
              </div>
              <div>{d!.score}</div>
            </div>
          ))
        ) : (
          <span>{error}</span>
        )}
        <div className={css.view}>
          <Link to="/leaderboard">
            <h2>View Full leaderboard</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
