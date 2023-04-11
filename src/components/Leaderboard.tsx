import { useEffect, useState } from "react";
import axios from "axios";
import css from "./Leaderboard.module.css";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users?page=0&size=5")
      .then((response) => {
        setData(response.data.content);
      });
  }, []);

  return (
    <div className={css.leaderboard}>
      {data.map((d: any) => (
        <div className={css.leaderboardUser}>
          <div>{d!.id}</div>
          <div>{d!.username}</div>
          <div>100</div>
        </div>
      ))}
      <div className={css.view}>
        <h2>View Full leaderboard</h2>
      </div>
    </div>
  );
};

export default Leaderboard;
