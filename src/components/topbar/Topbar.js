import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./topbar.scss";
import { Store } from "../../Store";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import MobileTopbar from "./MobileTopbar";

function Topbar() {
  const navStyle = ({ isActive }) => {
    return {
      borderBottom: isActive ? "#D50032 solid 6px" : "",
    };
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [showDropdown, setShowDropdown] = useState(false);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  function dropdown() {
    setShowDropdown(!showDropdown);
  }

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
        </div>
      </div>
      <div className="right">
        {userInfo ? (
          <div className="dropdown_container">
            <div className="dropdown_user" onClick={dropdown}>
              <FaUserCircle />
              <p>
                {userInfo.firstname + " " + userInfo.lastname}
              </p>
            </div>
            {showDropdown ? (
              <div className="dropdown">
                <ul>
                  <li>ACCOUNT</li>
                  <li onClick={signoutHandler}>LOGOUT</li>
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <NavLink style={navStyle} to="/login">
              LOGIN
            </NavLink>
            <NavLink style={navStyle} to="/register">
              REGISTER
            </NavLink>
          </>
        )}
      </div>
      <MobileTopbar />
    </div>
  );
}

export default Topbar;