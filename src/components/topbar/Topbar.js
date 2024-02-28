import React from "react";
import { NavLink } from "react-router-dom";
import "./topbar.scss";
import MobileTopbar from "./MobileTopbar";

function Topbar() {
  const navStyle = ({ isActive }) => {
    return {
      borderBottom: isActive ? "#D50032 solid 6px" : "",
    };
  };

  return (
    <div className="navbar">
      <div className="left">
        <NavLink to="/">
          <img src="/pictures/mlb.png" alt="" />
        </NavLink>
        <div className="links">
          <NavLink style={navStyle} to="/">
            SCORES
          </NavLink>
          <NavLink style={navStyle} to="/schedule">
            SCHEDULE
          </NavLink>
          <NavLink style={navStyle} to="/stats">
            STATS
          </NavLink>
          <NavLink style={navStyle} to="/teams">
            TEAMS
          </NavLink>
        </div>
      </div>
      <MobileTopbar />
    </div>
  );
}

export default Topbar;