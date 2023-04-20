import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import css from "./UserPage.module.css";

const MatchPage = () => {
  const [data, setData] = useState<any>();
  const [voted, setVoted] = useState<any>(false);
  //@ts-ignore
  const item = JSON.parse(localStorage.getItem("profile"));

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/match/${id}`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  const p1WinHandler = () => {
    axios
      .put(`http://localhost:8080/api/v1/result/${id}`, {
        vote: data!.player1,
        user: item.data.username,
      })
      .then(() => setVoted(true));
  };

  const p2WinHandler = () => {
    axios
      .put(`http://localhost:8080/api/v1/result/${id}`, {
        vote: data!.player2,
        user: item.data.username,
      })
      .then(() => setVoted(true));
  };

  return (
    <>
      <Link to="/home" className={css.back}>
        Back Home
      </Link>
      <main className={css.main}>
        <h2>
          {data?.player1} vs {data?.player2}
        </h2>

        <h3>{data?.dateTime}</h3>
        <h3>Who won?</h3>
        <div>
          {(item.data.username === data?.player2 &&
            data?.player2Voted === true) ||
          (item.data.username === data?.player1 &&
            data?.player1Voted === true) ||
          voted === true ? (
            <span>Waiting for the other player to vote</span>
          ) : (
            <>
              <button id={data?.id} type="button" onClick={p1WinHandler}>
                {data?.player1}
              </button>
              <button id={data?.id} type="button" onClick={p2WinHandler}>
                {data?.player2}
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default MatchPage;
