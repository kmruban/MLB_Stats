import React, {useState, useContext} from 'react';
import { Store } from "../../Store";
import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

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
            <div className="menu_dropdown">
              <ul>
                {userInfo ? (
                  <li>
                    <div className="dropdown_container">
                      <div className="dropdown_user">
                        <div>
                          <FaUserCircle />
                          <p onClick={dropdown}>
                            {userInfo.firstname + " " + userInfo.lastname}
                          </p>
                        </div>
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
                  </li>
                ) : null}
                <li>
                  <NavLink to="/" onClick={showMenu}>HOME</NavLink>
                </li>
                <li>
                  <NavLink to="/scores" onClick={showMenu}>SCORES</NavLink>
                </li>
                <li>
                  <NavLink to="/schedule" onClick={showMenu}>SCHEDULE</NavLink>
                </li>
                <li>
                  <NavLink to="/stats" onClick={showMenu}>STATS</NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={showMenu}>LOGIN</NavLink>
                </li>
                <li>
                  <NavLink to="/register" onClick={showMenu}>REGISTER</NavLink>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
  )
}

export default MobileTopbar
