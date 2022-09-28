import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Topbar from "./components/topbar/Topbar";
import Footer from "./components/footer/Footer";
import Player from "./screens/players/Player";
import HittingStats from "./screens/stats/HittingStats";
import PitchingStats from "./screens/stats/PitchingStats";
import Scores from "./screens/scores/Scores";
import Schedule from "./screens/scores/Schedule";
import GameDay from "./screens/gameday/GameDay";
import Register from "./screens/user_accounts/Register";
import Login from "./screens/user_accounts/Login";
import Account from "./screens/user_accounts/Account";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer position="top-center" limit={1} />
        <header>
          <Topbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Scores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/stats" element={<HittingStats />} />
            <Route path="/stats/pitching" element={<PitchingStats />} />
            <Route path="/player/:id" element={<Player />} />
            <Route path="/gameday/:gamePk" element={<GameDay />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
