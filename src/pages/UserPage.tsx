import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import css from "./UserPage.module.css";

interface user {
  id: string;
  username: string;
}

const UserPage = () => {
  const [data, setData] = useState<user>();
  //@ts-ignore
  const item = JSON.parse(localStorage.getItem("profile"));

  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users/${username}`)
      .then((response) => {
        setData(response.data);
        console.log(data);
      });
  }, []);

  const handleChallenge = () => {
    axios.post(`http://localhost:8080/api/v1/matches`, {
      player1: item.data.username,
      player2: username,
      dateTime: "6am tomorrow",
    });
  };

  return (
    <>
      <Link to="/home" className={css.back}>
        Back Home
      </Link>
      <main className={css.main}>
        <h3>{data?.id}</h3>
        <h2>{data?.username}</h2>
        <button type="button" onClick={handleChallenge}>
          Challenge
        </button>
      </main>
    </>
  );
};

export default UserPage;
