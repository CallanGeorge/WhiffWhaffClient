import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import EventsBlock from "../components/EventsBlock";

import css from "./UserPage.module.css";
import ConfirmedMatches from "../components/ConfirmedMatches";

const MatchPage = () => {
  const [data, setData] = useState<any>();
  //@ts-ignore
  const item = JSON.parse(localStorage.getItem("profile"));

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/match/${id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <>
      <Link to="/home" className={css.back}>
        Back Home
      </Link>
      <main className={css.main}>
        <h2>
          {data!.player1} vs {data!.player2}
        </h2>

        <h3>{data!.dateTime}</h3>
        <h3>Who won?</h3>
        <div>
          <button type="button">{data!.player1}</button>
          <button type="button">{data!.player2}</button>
        </div>
      </main>
    </>
  );
};

export default MatchPage;
