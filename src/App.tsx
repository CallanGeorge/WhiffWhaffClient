import "./App.css";
import { UserSignupPage } from "./pages/UserSignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSignupPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
