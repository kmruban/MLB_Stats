import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "../Store";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch: ctxDispatch } = useContext(Store);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://mlbstatsapi.us-east-1.elasticbeanstalk.com/User/login", {
        username,
        password,
      });

      console.log(username);
      console.log(password);
      ctxDispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="login_page">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <label>
              <b>Username: </b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Password: </b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="submit">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
