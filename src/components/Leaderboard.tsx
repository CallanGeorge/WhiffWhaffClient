import { useEffect, useState } from "react";
import axios from "axios";
import css from "./Leaderboard.module.css";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users?page=0&size=5")
      .then((response) => {
        setData(response.data.content);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
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
      <div className={css.view}>
        <Link to="/leaderboard">
          <h2>View Full leaderboard</h2>
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
