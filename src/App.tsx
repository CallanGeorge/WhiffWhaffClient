import { UserSignupPage } from "./pages/UserSignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LeaderBoardPage } from "./pages/LeaderBoardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
