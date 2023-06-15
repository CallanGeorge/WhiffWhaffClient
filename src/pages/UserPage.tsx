import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import EventsBlock from "../components/EventsBlock";

import css from "./UserPage.module.css";
import ConfirmedMatches from "../components/ConfirmedMatches";
import RecentMatches from "../components/RecentMatches";

import { user } from "../models/User";
import { match } from "../models/Match";

const UserPage = () => {
  const [user, setUser] = useState<user>();
  const [data, setData] = useState<user>();
  const [played, setPlayed] = useState<match>();
  const [challenged, setChallenged] = useState<boolean>(false);
  const navigate = useNavigate();

  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/user`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => navigate("/"));

    axios
      .get(`http://localhost:8080/api/v1/users/${username}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        console.log("done");
        setData(response.data);
      });

    axios
      .get(`http://localhost:8080/api/v1/final-matches/${username}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setPlayed(response.data);
      });
  }, []);

  return (
    <>
      <Link to="/home" className={css.back}>
        Back Home
      </Link>
      <main className={css.main}>
        <h2>{data?.name}</h2>
        <h3>{data?.score}</h3>

        {data?.name !== user?.name && challenged === false ? (
          <button type="button">
            <Link to={`/${data?.name}/challenge`}>Challenge</Link>
          </button>
        ) : (
          challenged == true && <span>Your Invite has been sent! </span>
        )}
        {data?.name === username && (
          <div className={css.blocks}>
            <EventsBlock /> <ConfirmedMatches user={user} />
          </div>
        )}

        {/* <RecentMatches matches={played} /> */}
      </main>
    </>
  );
};

export default UserPage;
