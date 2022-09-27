import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Topbar from "./components/topbar/Topbar";
import Footer from "./components/footer/Footer";
import Home from "./screens/Home";
import Player from "./screens/Player";
import HittingStats from "./screens/stats/HittingStats";
import PitchingStats from "./screens/stats/PitchingStats";
import Scores from "./screens/scores/Scores";
import Schedule from "./screens/scores/Schedule";
import GameDay from "./screens/gameday/GameDay";
import Register from "./screens/Register";
import Login from "./screens/Login";


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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/scores" element={<Scores />} />
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
