import React, { useState, useContext } from "react";
import { Store } from "../../Store";
import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "./mobileTopbar.scss";

function MobileTopbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  function dropdown() {
    setShowDropdown(!showDropdown);
  }

  function menu() {
    setShowMenu(!showMenu);
  }
  return (
    <div className="mobile_menu">
      <IoMdMenu onClick={menu} />
      {showMenu ? (
        <div className="menu_container">
          <div className="menu">
            <ul>
              {userInfo ? (
                <li className="menu_list">
                  <div className="user_container">
                    <div className="user">
                      <FaUserCircle />
                      <p onClick={dropdown}>
                        {userInfo.firstname + " " + userInfo.lastname}
                      </p>
                    </div>
                  </div>
                </li>
              ) : null}
              {showDropdown ? (
                <div className="dropdown">
                  <ul>
                    <li>
                    <NavLink className="dropdown_list" to="/account" onClick={showMenu}>
                    ACCOUNT
                    </NavLink>
                    </li>
                    <li className="dropdown_list" onClick={signoutHandler}>
                      LOGOUT
                    </li>
                  </ul>
                </div>
              ) : null}
              <li className="menu_list">
                <NavLink to="/" onClick={showMenu}>
                  SCORES
                </NavLink>
              </li>
              <li className="menu_list">
                <NavLink to="/schedule" onClick={showMenu}>
                  SCHEDULE
                </NavLink>
              </li>
              <li className="menu_list">
                <NavLink to="/stats" onClick={showMenu}>
                  STATS
                </NavLink>
              </li>
              {userInfo ? null : (
                <>
                  <li className="menu_list">
                    <NavLink to="/login" onClick={showMenu}>
                      LOGIN
                    </NavLink>
                  </li>
                  <li className="menu_list">
                    <NavLink to="/register" onClick={showMenu}>
                      REGISTER
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MobileTopbar;
