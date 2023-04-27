import { useState, useEffect } from "react";
import axios from "axios";

import { match } from "../models/Match";

import css from "./EventsBlock.module.css";
import { Link } from "react-router-dom";

const ConfirmedMatches = () => {
  const [matches, setMatches] = useState<match[]>(); // MAYBE ERRORS HERE
  //@ts-ignore
  const item = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/matches/${item.data.username}`)
      .then((response) => setMatches(response.data));
  }, []);

  const handleAccept = (e: any) => {
    const id = Number(e.target.id);

    axios.put(`http://localhost:8080/api/v1/matches/${id}`);
  };

  return (
    <>
      {matches && <h2>Ongoing Events</h2>}
      {/* @ts-ignore */}
      <div className={css.container}>
        {console.log(matches)}
        {matches?.length === 0 ? (
          <h3>There are currently no upcoming matches</h3>
        ) : (
          matches?.map((m: any) => (
            <div className={css.invite}>
              <div className={css.players}>
                <span>{m!.player1}</span> <span>challenged</span>{" "}
                <span>{m!.player2}</span>
              </div>
              <div className={css.time}>{m!.dateTime} </div>
              <div className={m!.accepted ? css.accepted : css.pending}>
                <button type="button">
                  <Link to={`/match/${m!.id}`}>I have played this game</Link>{" "}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ConfirmedMatches;
