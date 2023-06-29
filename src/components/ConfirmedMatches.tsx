import { useState, useEffect } from "react";
import axios from "axios";

import { match } from "../models/Match";
import { user } from "../models/User";

import css from "./EventsBlock.module.css";
import { Link } from "react-router-dom";

interface props {
  checkMatch?: any;
  user?: user;
}

const ConfirmedMatches = ({ checkMatch, user }: props) => {
  const [matches, setMatches] = useState<match[]>();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/matches/${user?.email}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setMatches(response.data);
        checkMatch(response.data);
      });
  }, [user]);

  return (
    <>
      {matches && <h2>Upcoming Matches</h2>}
      {/* @ts-ignore */}
      <div className={css.container}>
        {console.log(matches)}
        {matches?.length === 0 ? (
          <h3>You currently have no upcoming matches</h3>
        ) : (
          matches?.map((m: match, i: number) => (
            <div className={css.invite} key={i}>
              <div className={css.players}>
                <span>{m!.player1}</span> <span>challenged</span>{" "}
                <span>{m!.player2}</span>
              </div>
              <div className={m!.response === 1 ? css.accepted : css.pending}>
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
