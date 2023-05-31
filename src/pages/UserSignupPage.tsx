import css from "./UserSignupPage.module.css";
import { useRef, useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserSignupPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [signUp, setSignup] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState("");

  // need to look at AWS login this week!!

  useEffect(() => {
    // //@ts-ignore
    // const item = JSON.parse(localStorage.getItem("profile"));
    // // profile from local storage returns differently constructed object depending on if created in sign up or sign in
    // if (item) {
    //   setUser(item.data.username);
    //   navigate("/home");
    // }
    // axios
    //   .get("http://localhost:8080/secured", {
    //     withCredentials: true,
    //     //@ts-ignore
    //     origin: "http://localhost:8080",
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  }, []);

  error === "none" && navigate("/home");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!signUp) {
  //     await axios
  //       .post(
  //         "http://localhost:8080/api/v1/login",
  //         {},
  //         {
  //           auth: {
  //             username: nameRef.current!.value,
  //             password: passwordRef.current!.value,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setPending(false);
  //         setError("none");
  //         console.log(res);
  //         const data = res.data;

  //         localStorage.setItem("profile", JSON.stringify({ data }));
  //       })
  //       .catch((err) => setError("Error loggin in"));
  //   }

  //   if (signUp) {
  //     !confirmPasswordRef.current!.value || !passwordRef.current!.value
  //       ? setError("Input password ")
  //       : confirmPasswordRef.current?.value !== passwordRef.current?.value
  //       ? setError("Passwords do not match")
  //       : (() => setPending(true)) &&
  //         (() => setError("")) &&
  //         (await axios
  //           .post(
  //             "http://localhost:8080/api/v1/users",

  //             {
  //               username: nameRef.current!.value,
  //               password: passwordRef.current!.value,
  //             }
  //           )
  //           .then((res) => {
  //             setPending(false);
  //             navigate("/"); // will need to redirect to login after sign up - doesnt work not cause need to refactor
  //           })
  //           .catch((err) => setError("Username already in use.")));
  //   }
  // };

  // refactor this into smaller components

  return (
    <main className={css.container}>
      <h1>Welcome to whiff whaff</h1>
      <button>
        <a href="http://localhost:8080/auth">Sign In</a>
      </button>
      {/* {signUp === false ? (
        <form className={css.form} onSubmit={handleSubmit}>
          <h2>Sign In! or</h2>
          <button type="button" onClick={() => setSignup(true)}>
            Sign Up
          </button>

          <label>Name</label>
          <input type="text" name="name" ref={nameRef} />
          <label>Password</label>
          <input type="password" name="password" ref={passwordRef} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form className={css.form} onSubmit={handleSubmit}>
          <h2>Sign Up! or</h2>
          <button type="button" onClick={() => setSignup(false)}>
            Sign In
          </button>

          <label>Name</label>
          <input type="text" name="name" ref={nameRef} />
          <label>Password</label>
          <input type="password" name="password" ref={passwordRef} />
          <label>Confirm Password</label>
          <input type="password" name="password" ref={confirmPasswordRef} />
          <button type="submit">
            {pending ? <span>Pending</span> : <span>Submit</span>}
          </button>
          <p>{error}</p> */}
      {/* </form> */}
      {/* )} */}
    </main>
  );
};
