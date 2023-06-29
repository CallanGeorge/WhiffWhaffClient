import { useState, useEffect } from "react";
import axios from "axios";

import { match } from "../models/Match";
import { user } from "../models/User";

import css from "./EventsBlock.module.css";

interface props {
  checkInvites?: any;
  user?: user;
}

const EventsBlock = ({ checkInvites, user }: props) => {
  const [matches, setMatches] = useState<match[]>([]);

  useEffect(() => {
    console.log(user);
    axios
      .get(`http://localhost:8080/api/v1/invites/${user?.email}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setMatches(response.data);
        checkInvites(response.data);
      });
  }, [user]);

  const handleAccept = (e: any) => {
    const id = Number(e.target.id);

    axios.put(
      `http://localhost:8080/api/v1/matches/${id}`,
      {},
      {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      }
    );
  };

  console.log(matches);
  return (
    <>
      {" "}
      <h2>Invites</h2>
      <div className={css.container}>
        {matches.length < 1 ? (
          <h3>You have no match invites </h3>
        ) : (
          matches.map((m: match, i: number) => (
            <div className={css.invite} key={i}>
              <div className={css.players}>
                <span>{m!.player1}</span> <span>challenged</span>{" "}
                <span>{m!.player2}</span>
              </div>
              <div className={m!.response === 1 ? css.accepted : css.pending}>
                pending
                {user?.email === m?.player2 && m?.response === 0 && (
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
    </>
  );
};

export default EventsBlock;
