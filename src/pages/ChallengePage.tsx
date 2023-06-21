import axios from "axios";
import css from "./challengePage.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

import { user } from "../models/User";
import { match } from "../models/Match";

export const ChallengePage = () => {
  const [user, setUser] = useState<user>();
  const [data, setData] = useState<user>();
  const [userCalendar, setUserCalendar] = useState<any>([]);
  const [oppCalendar, setOppCalendar] = useState<any>();
  const [challenged, setChallenged] = useState<boolean>(false);
  const [day, setDay] = useState<Number>();
  const [month, setMonth] = useState<Number>();
  const [year, setYear] = useState<Number>();
  const [time, setTime] = useState<String>();
  const navigate = useNavigate();

  const { username } = useParams();

  const date = `${year}-${month! < 10 ? `0${month}` : month}-${day}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/user`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setUser(response.data);
      });

    axios
      .get(`http://localhost:8080/api/v1/token/${date}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setUserCalendar(response.data);
      });

    axios
      .get(`http://localhost:8080/api/v1/token/${date}/${username}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setOppCalendar(response.data);
      });
  }, [day]);

  const handleChallenge = () => {
    axios.post(
      `http://localhost:8080/api/v1/matches`,
      {
        player1: user?.name,
        player2: data?.name,
      },
      {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      }
    );

    setChallenged(true);
  };

  return (
    <main className={css.container}>
      <h1>CHALLENGE PAGE</h1>
      <div className={css.calendarContainer}>
        <div className={css.userCalendar}>
          {userCalendar ? (
            userCalendar.map((m: any) => (
              <div className={css.calendarItem}>
                <h2>{m?.title}</h2>
                <h3>{m?.time}</h3>
              </div>
            ))
          ) : (
            <p>no events</p>
          )}
        </div>
        <div className={css.oppCalendar}>
          {oppCalendar ? (
            oppCalendar.map((m: any) => (
              <div className={css.calendarItem}>
                <h2>{m?.title}</h2>
                <h3>{m?.time}</h3>
              </div>
            ))
          ) : (
            <p>no events</p>
          )}
        </div>
      </div>

      <DatePicker
        onChange={(e) => {
          /* @ts-ignore */
          setDay(e.$D);
          /* @ts-ignore */
          setMonth(e.$M + 1);
          /* @ts-ignore */
          setYear(e.$y);
        }}
      />

      <TimePicker
        onChange={(e: any) => {
          setTime(e.$d);
          /* @ts-ignore */
          const dateObj = new Date(e.$d);
          const hours = dateObj.getHours();
          const minutes = dateObj.getMinutes();
          const seconds = dateObj.getSeconds();

          setTime(`${hours}:${minutes}:${seconds}`);
        }}
      />
    </main>
  );
};
