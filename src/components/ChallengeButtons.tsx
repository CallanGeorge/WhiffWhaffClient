import css from "./ChallengeButtons.module.css";
import axios from "axios";
import { user } from "../models/User";

interface props {
  unAvailable: string[];
  date: string;
  user: any;
  data: any;
  challenged: boolean;
  setChallenged: any;
}

const ChallengeButtons = ({
  unAvailable,
  date,
  user,
  data,
  challenged,
  setChallenged,
}: props) => {
  const timestamps = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const hourStr = hour.toString().padStart(2, "0");
      const minuteStr = minute.toString().padStart(2, "0");
      timestamps.push(`${hourStr}:${minuteStr}:00`);
    }
  }
  timestamps.splice(-4);

  const isInArray = (element: string, array: string[]) =>
    array.includes(element);

  // Remove common elements from array1
  const filteredArray1 = timestamps.filter(
    (element) => !isInArray(element, unAvailable)
  );
  const handleChallenge = (time: string) => {
    axios.post(
      `http://localhost:8080/api/v1/matches`,
      {
        player1: user?.email,
        player2: data?.email,

        //FIGURE OUT HOW TO MAKE THIS MORE CONSITENT
        matchTime: `${date}T${time}`,
      },
      {
        withCredentials: true,
        //@ts-ignore
        origin: "http://localhost:8080",
      }
    );

    setChallenged(true);
  };

  return !date.match("undefined") && challenged === false ? (
    <div className={css.buttonContainer}>
      {filteredArray1.map((time) => (
        <div className={css.buttonPlaque}>
          <h3>{time}</h3>
          <button onClick={() => handleChallenge(time)}>Challenge</button>
        </div>
      ))}
    </div>
  ) : challenged === true ? (
    <h3>Challenge Sent!</h3>
  ) : null;
};

export default ChallengeButtons;
