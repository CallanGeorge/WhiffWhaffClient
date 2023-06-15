import { UserSignupPage } from "./pages/UserSignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LeaderBoardPage } from "./pages/LeaderBoardPage";
import UserPage from "./pages/UserPage";
import MatchPage from "./pages/MatchPage";
import { ChallengePage } from "./pages/ChallengePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/:username/challenge" element={<ChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
