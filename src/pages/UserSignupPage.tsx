import css from "./popup.module.css";
import { useRef, useState } from "react";
import axios from "axios";

export const UserSignupPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [signUp, setSignup] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUp) {
      axios
        .post("http://localhost:8080/api/v1/users", {
          auth: {
            username: nameRef.current!.value,
            password: passwordRef.current!.value,
          },
        })
        .then(() => setPending(false))
        .catch((err) => setError("Error loggin in"));
    }

    if (signUp) {
      !confirmPasswordRef.current!.value || !passwordRef.current!.value
        ? setError("Input password ")
        : confirmPasswordRef.current?.value !== passwordRef.current?.value
        ? setError("Passwords do not match")
        : (() => setPending(true)) &&
          (() => setError("")) &&
          axios
            .post(
              "http://localhost:8080/api/v1/users",

              {
                username: nameRef.current!.value,
                password: passwordRef.current!.value,
              }
            )
            .then(() => setPending(false))
            .catch((err) => setError("Username already in use."));
    }
  };

  // refactor this into smaller components

  return (
    <main className={css.container}>
      <h1 role="heading">Welcome to whiff whaff</h1>
      {signUp === false ? (
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
          <p>{error}</p>
        </form>
      )}
    </main>
  );
};
