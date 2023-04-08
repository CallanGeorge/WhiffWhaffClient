import EventsBlock from "../components/EventsBlock";
import Leaderboard from "../components/Leaderboard";
import RecentMatches from "../components/RecentMatches";
import { useEffect, useState } from "react";

import css from "./Home.module.css";

export const Home = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    //@ts-ignore
    const item = JSON.parse(localStorage.getItem("profile"));
    // profile from local storage returns differently constructed object depending on if created in sign up or sign in
    item ? setUser(item.data) : setUser("");
  }, []);
  return (
    <div className={css.main}>
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
    </div>
  );
};

export {};
