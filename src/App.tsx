import { UserSignupPage } from "./pages/UserSignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LeaderBoardPage } from "./pages/LeaderBoardPage";
import UserPage from "./pages/UserPage";
import MatchPage from "./pages/MatchPage";
import { ChallengePage } from "./pages/ChallengePage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
    </LocalizationProvider>
  );
}

export default App;
