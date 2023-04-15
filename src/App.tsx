import { UserSignupPage } from "./pages/UserSignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LeaderBoardPage } from "./pages/LeaderBoardPage";
import UserPage from "./pages/UserPage";
import MatchPage from "./pages/MatchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/match/:id" element={<MatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
