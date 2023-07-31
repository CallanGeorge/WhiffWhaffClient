import axios from "axios";
import css from "./challengePage.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import ChallengeButtons from "../components/ChallengeButtons";

import { user } from "../models/User";
import { match } from "../models/Match";

export const ChallengePage = () => {
  const [user, setUser] = useState<user>();
  const [data, setData] = useState<user>();
  const [userCalendar, setUserCalendar] = useState<any>([]);
  const [whiffWhaffCalendar, setWhiffWhaffCalendar] = useState<any>([]);
  const [oppCalendar, setOppCalendar] = useState<any>([]);
  const [challenged, setChallenged] = useState<boolean>(false);
  const [day, setDay] = useState<Number>();
  const [month, setMonth] = useState<Number>();
  const [year, setYear] = useState<Number>();
  const navigate = useNavigate();

  const { username } = useParams();

  const date = `${year}-${month! < 10 ? `0${month}` : month}-${
    day! < 10 ? `0${day}` : day
  }`;

  console.log(date);

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
      .get(`http://localhost:8080/api/v1/token/whiffwhaff/${date}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setWhiffWhaffCalendar(response.data);
      });

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
      .get(`http://localhost:8080/api/v1/token/${date}/${username}`, {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      })
      .then((response) => {
        setOppCalendar(response.data);
      });
  }, [day]);

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
          {whiffWhaffCalendar ? (
            whiffWhaffCalendar.map((m: any) => (
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

      <ChallengeButtons
        unAvailable={oppCalendar}
        date={date}
        user={user}
        data={data}
        challenged={challenged}
        setChallenged={setChallenged}
      />
    </main>
  );
};
