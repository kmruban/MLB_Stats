import React from "react";
import "./app.scss";
import { HashRouter as Router, Route, Routes } from "react-router-dom";import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Topbar from "./components/topbar/Topbar";
import Footer from "./components/footer/Footer";
import Player from "./screens/players/Player";
import Stats from "./screens/stats/Stats";
import Scores from "./screens/scores/Scores";
import Schedule from "./screens/scores/Schedule";
import GameDay from "./screens/gameday/GameDay";
import Account from "./screens/user_accounts/Account";
import Teams from "./screens/teams/Teams";

function App() {
  return (
    <Router>
      <div className="app">
        <ToastContainer position="top-center" limit={1} />
        <header>
          <Topbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Scores />} />
            <Route path="/account" element={<Account />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/player/:id" element={<Player />} />
            <Route path="/gameday/:gamePk" element={<GameDay />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
