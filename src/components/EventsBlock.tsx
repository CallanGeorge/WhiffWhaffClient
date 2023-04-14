import { useState, useEffect } from "react";
import axios from "axios";

import css from "./EventsBlock.module.css";

const EventsBlock = () => {
  const [matches, setMatches] = useState<any>([]);
  //@ts-ignore
  const item = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/matches/${item.data.username}`)
      .then((response) => setMatches(response.data));
  }, []);

  return (
    <div className={css.container}>
      {!matches ? (
        <h3>There are currently no upcoming events</h3>
      ) : (
        matches.map((m: any) => (
          <div>
            <h1>{m?.player2}</h1>{" "}
          </div>
        ))
      )}
    </div>
  );
};

export default EventsBlock;
