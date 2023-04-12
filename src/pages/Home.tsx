import EventsBlock from "../components/EventsBlock";
import Leaderboard from "../components/Leaderboard";
import RecentMatches from "../components/RecentMatches";
import { useEffect, useState } from "react";

import css from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //@ts-ignore
    const item = JSON.parse(localStorage.getItem("profile"));
    // profile from local storage returns differently constructed object depending on if created in sign up or sign in
    item ? setUser(item.data.username) : navigate("/");
  }, []);
  return (
    <main className={css.main}>
      <h1>Welcome to xDesign ping pong</h1>
      <span>Signed in as: {user}</span>
      <div className={css.box}>
        <h2>Upcoming Events</h2>
        <EventsBlock />
      </div>
      <div className={css.box}>
        <h2>Leaderboard</h2>
        <Leaderboard />
      </div>
      <div className={css.box}>
        <h2>Recent Matches</h2>
        <RecentMatches />
      </div>
    </main>
  );
};

export {};
