import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import EventsBlock from "../components/EventsBlock";

import css from "./UserPage.module.css";
import ConfirmedMatches from "../components/ConfirmedMatches";
import RecentMatches from "../components/RecentMatches";

import { user } from "../models/User";
import { match } from "../models/Match";

const UserPage = () => {
  const [data, setData] = useState<user>();
  const [played, setPlayed] = useState<match>();
  const [challenged, setChallenged] = useState<boolean>(false);
  //@ts-ignore
  const item = JSON.parse(localStorage.getItem("profile"));

  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users/${username}`)
      .then((response) => {
        setData(response.data);
      });

    axios
      .get(`http://localhost:8080/api/v1/final-matches/${username}`)
      .then((response) => {
        setPlayed(response.data);
      });
  }, []);

  const handleChallenge = () => {
    axios.post(`http://localhost:8080/api/v1/matches`, {
      player1: item.data.username,
      player2: username,
    });

    setChallenged(true);
  };

  return (
    <>
      <Link to="/home" className={css.back}>
        Back Home
      </Link>
      <main className={css.main}>
        <h2>{data?.name}</h2>
        <h3>{data?.score}</h3>

        {item.data.username !== username && challenged === false ? (
          <button type="button" onClick={handleChallenge}>
            Challenge
          </button>
        ) : (
          challenged == true && <span>Your Invite has been sent! </span>
        )}
        {item.data.username === username && (
          <div className={css.blocks}>
            <h2>Invites</h2> <EventsBlock /> <ConfirmedMatches />
          </div>
        )}

        <RecentMatches matches={played} />
      </main>
    </>
  );
};

export default UserPage;
