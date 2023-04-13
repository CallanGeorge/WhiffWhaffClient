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

  return (
    <>
      <Link to="/home" className={css.back}>
        Back Home
      </Link>
      <main className={css.main}>
        <h3>{data?.id}</h3>
        <h2>{data?.username}</h2>
      </main>
    </>
  );
};

export default UserPage;
