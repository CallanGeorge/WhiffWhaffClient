import ConfirmedMatches from "../components/ConfirmedMatches";
import Leaderboard from "../components/Leaderboard";
import RecentMatches from "../components/RecentMatches";
import { useEffect, useState } from "react";
import axios from "axios";

import WhiffWhaffLogo from "../assets/WhiffWhaffLogo.png";

import css from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const [matches, setMatches] = useState<any>([]);

  useEffect(() => {
    //@ts-ignore
    const item = JSON.parse(localStorage.getItem("profile"));
    // profile from local storage returns differently constructed object depending on if created in sign up or sign in
    item ? setUser(item.data.username) : navigate("/");
    axios
      .get(`http://localhost:8080/api/v1/all-matches?page=0&size=5`)
      .then((response) => {
        setMatches(response.data.content);
      });
  }, []);

  return (
    <main className={css.main}>
      <div className={css.header}>
        <img
          className={css.image}
          src={WhiffWhaffLogo}
          alt="Whiff Whaff Logo"
        />
        <div className={css.signIn}>{!user ? "Sign In" : "Sign out"}</div>
      </div>
      <span>
        Signed in as: <Link to={`/${user}`}>{user}</Link>
      </span>
      {/* <div className={css.box}>
        <ConfirmedMatches />
      </div> */}
      <div className={css.box}>
        <Leaderboard />
      </div>
      <div className={css.box}>
        <RecentMatches matches={matches} />
      </div>
    </main>
  );
};

export {};
