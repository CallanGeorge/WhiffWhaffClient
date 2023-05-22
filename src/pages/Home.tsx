import Leaderboard from "../components/Leaderboard";
import RecentMatches from "../components/RecentMatches";
import { useEffect, useState } from "react";
import axios from "axios";

import { match } from "../models/Match";

import WhiffWhaffLogo from "../assets/WhiffWhaffLogo.png";

import css from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import ConfirmedMatches from "../components/ConfirmedMatches";
import EventsBlock from "../components/EventsBlock";

export const Home = () => {
  const [user, setUser] = useState<any>({});
  const [confirmedMatch, setConfirmedMatch] = useState<match[]>();
  const [invites, setInvites] = useState<match[]>();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<match[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/all-matches?page=0&size=5`)
      .then((response) => {
        setMatches(response.data.content);
      });

    axios
      .get(`http://localhost:8080/user`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  console.log(invites);

  const handleClick = () => {
    localStorage.removeItem("profile");
    window.location.reload();
  };

  return (
    <main className={css.main}>
      <div className={css.header}>
        <img
          className={css.image}
          src={WhiffWhaffLogo}
          alt="Whiff Whaff Logo"
        />
        <button onClick={handleClick} className={css.signIn}>
          {!user ? "Sign In" : "Sign out"}
        </button>
      </div>

      {
        <span>
          Signed in as: <Link to={`/${user.name}`}>{user.name}</Link>
        </span>
      }

      {/* <div className={css.box}>
        <ConfirmedMatches checkMatch={setConfirmedMatch} />
      </div>
      <div className={css.box}>
        <EventsBlock checkInvites={setInvites} />
      </div>

      <div className={css.box}>
        <Leaderboard />
      </div>
      <div className={css.box}>
        <RecentMatches matches={matches} />
      </div> */}
    </main>
  );
};

export {};
