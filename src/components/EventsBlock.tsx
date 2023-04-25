import { useState, useEffect } from "react";
import axios from "axios";

import css from "./EventsBlock.module.css";

const EventsBlock = () => {
  const [matches, setMatches] = useState<any>([]);
  //@ts-ignore
  const item = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/invites/${item.data.username}`)
      .then((response) => setMatches(response.data));
  }, []);

  const handleAccept = (e: any) => {
    const id = Number(e.target.id);

    axios.put(`http://localhost:8080/api/v1/matches/${id}`);
  };

  return (
    <div className={css.container}>
      {matches.length < 1 ? (
        <h3>You have no match invites </h3>
      ) : (
        matches.map((m: any, i: any) => (
          <div className={css.invite} key={i}>
            <div className={css.players}>
              <span>{m!.player1}</span> <span>challenged</span>{" "}
              <span>{m!.player2}</span>
            </div>
            <div className={css.time}>{m!.dateTime} </div>
            <div className={m!.accepted ? css.accepted : css.pending}>
              pending
              {item.data.username === m!.player2 && m!.accepted === false && (
                <button
                  id={m!.id}
                  type="button"
                  onClick={(e) => handleAccept(e)}
                >
                  Accept
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventsBlock;
