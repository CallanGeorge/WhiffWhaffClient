import css from "./UserSignupPage.module.css";

export const UserSignupPage = () => {
  return (
    <main className={css.container}>
      <h1>Welcome to whiff whaff</h1>
      <button>
        <a href="http://localhost:8080/api/v1/auth">Sign In</a>
      </button>
    </main>
  );
};
